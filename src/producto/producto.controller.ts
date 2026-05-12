import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('productos')
@Controller('productos')
@UsePipes(new ValidationPipe({ transform: true }))
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiBody({ type: CreateProductoDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Producto creado' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoría no encontrada' })
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos activos' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de productos' })
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Producto encontrado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Producto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiBody({ type: UpdateProductoDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Producto actualizado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Producto no encontrado' })
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productoService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Producto eliminado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Producto no encontrado' })
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}