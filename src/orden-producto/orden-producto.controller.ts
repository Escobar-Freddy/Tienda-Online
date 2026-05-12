import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdenProductoService } from './orden-producto.service';
import { CreateOrdenProductoDto } from './dto/create-orden-producto.dto';
import { UpdateOrdenProductoDto } from './dto/update-orden-producto.dto';

@Controller('orden-producto')
export class OrdenProductoController {
  constructor(private readonly ordenProductoService: OrdenProductoService) {}

  @Post()
  create(@Body() createOrdenProductoDto: CreateOrdenProductoDto) {
    return this.ordenProductoService.create(createOrdenProductoDto);
  }

  @Get()
  findAll() {
    return this.ordenProductoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenProductoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenProductoDto: UpdateOrdenProductoDto) {
    return this.ordenProductoService.update(+id, updateOrdenProductoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenProductoService.remove(+id);
  }
}
