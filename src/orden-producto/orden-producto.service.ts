import { Injectable } from '@nestjs/common';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Injectable()
export class OrdenProductoService {
  create(createOrdenProductoDto: CreateOrdenProductoDto) {
    return 'This action adds a new ordenProducto';
  }

  findAll() {
    return `This action returns all ordenProducto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordenProducto`;
  }

  update(id: number, updateOrdenProductoDto: UpdateOrdenProductoDto) {
    return `This action updates a #${id} ordenProducto`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordenProducto`;
  }
}
