import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('clientes')  // ← Agrupa endpoints por módulo
@Controller('clientes')
@UsePipes(new ValidationPipe({ transform: true }))
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiBody({ type: CreateClienteDto, description: 'Datos del cliente a crear' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Cliente creado exitosamente' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email ya registrado' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes activos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de clientes', type: [CreateClienteDto] })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cliente encontrado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cliente no encontrado' })
  findOne(@Param('id') id: string) {
    return this.clienteService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente a actualizar' })
  @ApiBody({ type: UpdateClienteDto, description: 'Datos a actualizar' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cliente actualizado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cliente no encontrado' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del cliente a eliminar' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Cliente eliminado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Cliente no encontrado' })
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}