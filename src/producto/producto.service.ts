import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';  
import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Categoria } from '../categoria/entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Producto[]> {
    return this.productoRepository.find({
      where: { eliminadoEn: IsNull() },  
      relations: ['categoria', 'ordenes'],
    });
  }

  async findOne(id: number): Promise<Producto> {
    const producto = await this.productoRepository.findOne({
      where: { idProducto: id, eliminadoEn: IsNull() },  
      relations: ['categoria', 'ordenes'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return producto;
  }

  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { idCategoria: createProductoDto.categoriaId, eliminadoEn: IsNull() },  
    });
    
    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${createProductoDto.categoriaId} no encontrada`);
    }
    
    const producto = this.productoRepository.create({
      nombre: createProductoDto.nombre,
      descripcion: createProductoDto.descripcion || '',
      precio: createProductoDto.precio,
      stock: createProductoDto.stock || 0,
      categoria: categoria,
    });
    
    return this.productoRepository.save(producto);
  }

  async update(id: number, updateProductoDto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    
    if (updateProductoDto.categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { idCategoria: updateProductoDto.categoriaId, eliminadoEn: IsNull() },  
      });
      if (!categoria) {
        throw new NotFoundException(`Categoría con ID ${updateProductoDto.categoriaId} no encontrada`);
      }
      producto.categoria = categoria;
    }
    
    if (updateProductoDto.nombre) {
      producto.nombre = updateProductoDto.nombre;
    }
    
    if (updateProductoDto.descripcion !== undefined) {
      producto.descripcion = updateProductoDto.descripcion;
    }
    
    if (updateProductoDto.precio) {
      producto.precio = updateProductoDto.precio;
    }
    
    if (updateProductoDto.stock !== undefined) {
      producto.stock = updateProductoDto.stock;
    }
    
    return this.productoRepository.save(producto);
  }

  async remove(id: number): Promise<void> {
    const producto = await this.findOne(id);
    producto.eliminadoEn = new Date();
    await this.productoRepository.save(producto);
  }
}