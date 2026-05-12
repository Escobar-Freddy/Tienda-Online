import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { OrdenService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('ordenes')
@Controller('ordenes')
@UsePipes(new ValidationPipe({ transform: true }))
export class OrdenController {
  constructor(private readonly ordenService: OrdenService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva orden' })
  @ApiBody({ type: CreateOrdenDto, description: 'Datos de la orden (clienteId y lista de productos con cantidad)' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Orden creada exitosamente' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos o stock insuficiente' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cliente o producto no encontrado' })
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordenService.create(createOrdenDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las órdenes activas' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de órdenes con sus productos' })
  findAll() {
    return this.ordenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una orden por ID' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden encontrada con sus productos' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  findOne(@Param('id') id: string) {
    return this.ordenService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una orden' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiBody({ type: UpdateOrdenDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden actualizada' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordenService.update(+id, updateOrdenDto);
  }

  @Patch(':id/estado')
  @ApiOperation({ summary: 'Cambiar el estado de una orden' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiBody({ schema: { example: { estado: 'pagado' } }, description: 'Estados válidos: pendiente, pagado, enviado, entregado, cancelado' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Estado actualizado' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Estado no válido' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  cambiarEstado(@Param('id') id: string, @Body('estado') estado: string) {
    return this.ordenService.cambiarEstado(+id, estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una orden (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID de la orden' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Orden eliminada' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Orden no encontrada' })
  remove(@Param('id') id: string) {
    return this.ordenService.remove(+id);
  }
}