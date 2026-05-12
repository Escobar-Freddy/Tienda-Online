import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';  // ← Importar IsNull
import { Orden } from './entities/orden.entity';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Producto } from '../producto/entities/producto.entity';
import { OrdenProducto } from '../orden-producto/entities/orden-producto.entity';

@Injectable()
export class OrdenService {
  constructor(
    @InjectRepository(Orden)
    private ordenRepository: Repository<Orden>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(OrdenProducto)
    private ordenProductoRepository: Repository<OrdenProducto>,
  ) {}

  async findAll(): Promise<Orden[]> {
    return this.ordenRepository.find({
      where: { eliminadoEn: IsNull() },  // ← Cambiado
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
  }

  async findOne(id: number): Promise<Orden> {
    const orden = await this.ordenRepository.findOne({
      where: { idOrden: id, eliminadoEn: IsNull() },  // ← Cambiado
      relations: ['cliente', 'ordenProductos', 'ordenProductos.producto'],
    });
    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
    return orden;
  }

  async create(createOrdenDto: CreateOrdenDto): Promise<Orden> {
    // Verificar que el cliente existe
    const cliente = await this.clienteRepository.findOne({
      where: { idCliente: createOrdenDto.clienteId, eliminadoEn: IsNull() },  // ← Cambiado
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${createOrdenDto.clienteId} no encontrado`);
    }

    // Crear la orden
    const orden = this.ordenRepository.create({
      cliente: cliente,
      estado: createOrdenDto.estado || 'pendiente',
      total: 0,
    });

    await this.ordenRepository.save(orden);

    // Procesar cada producto de la orden
    let totalOrden = 0;
    const ordenProductos: OrdenProducto[] = [];

    for (const item of createOrdenDto.productos) {
      const producto = await this.productoRepository.findOne({
        where: { idProducto: item.idProducto, eliminadoEn: IsNull() },  // ← Cambiado
      });
      
      if (!producto) {
        throw new NotFoundException(`Producto con ID ${item.idProducto} no encontrado`);
      }

      // Verificar stock
      if (producto.stock < item.cantidad) {
        throw new BadRequestException(`Stock insuficiente para producto ${producto.nombre}`);
      }

      // Actualizar stock
      producto.stock -= item.cantidad;
      await this.productoRepository.save(producto);

      // Crear el detalle de la orden
      const ordenProducto = this.ordenProductoRepository.create({
        orden: orden,
        producto: producto,
        cantidad: item.cantidad,
        precio_unitario: producto.precio,
      });

      await this.ordenProductoRepository.save(ordenProducto);
      ordenProductos.push(ordenProducto);
      totalOrden += producto.precio * item.cantidad;
    }

    // Actualizar el total de la orden
    orden.total = totalOrden;
    orden.ordenProductos = ordenProductos;
    await this.ordenRepository.save(orden);

    return this.findOne(orden.idOrden);
  }

  async update(id: number, updateOrdenDto: UpdateOrdenDto): Promise<Orden> {
    const orden = await this.findOne(id);
    
    if (updateOrdenDto.estado) {
      orden.estado = updateOrdenDto.estado;
    }
    
    if (updateOrdenDto.clienteId) {
      const cliente = await this.clienteRepository.findOne({
        where: { idCliente: updateOrdenDto.clienteId, eliminadoEn: IsNull() },  // ← Cambiado
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente con ID ${updateOrdenDto.clienteId} no encontrado`);
      }
      orden.cliente = cliente;
    }
    
    await this.ordenRepository.save(orden);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const orden = await this.findOne(id);
    orden.eliminadoEn = new Date();
    await this.ordenRepository.save(orden);
    
    // Soft delete de los detalles
    for (const detalle of orden.ordenProductos) {
      detalle.eliminadoEn = new Date();
      await this.ordenProductoRepository.save(detalle);
    }
  }

  async cambiarEstado(id: number, estado: string): Promise<Orden> {
    const orden = await this.findOne(id);
    const estadosPermitidos = ['pendiente', 'pagado', 'enviado', 'entregado', 'cancelado'];
    
    if (!estadosPermitidos.includes(estado)) {
      throw new BadRequestException(`Estado no válido. Estados permitidos: ${estadosPermitidos.join(', ')}`);
    }
    
    orden.estado = estado;
    await this.ordenRepository.save(orden);
    return this.findOne(id);
  }
}