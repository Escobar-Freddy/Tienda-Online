import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, HttpStatus } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('categorias')
@Controller('categorias')
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  @ApiBody({ type: CreateCategoriaDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Categoría creada' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos inválidos' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriaService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las categorías activas' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Lista de categorías' })
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría con sus productos' })
  @ApiParam({ name: 'id', description: 'ID de la categoría' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Categoría encontrada con sus productos' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoría no encontrada' })
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una de las categoría' })
  @ApiParam({ name: 'id', description: 'ID de la categoría' })
  @ApiBody({ type: UpdateCategoriaDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Categoría actualizada' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoría no encontrada' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría (soft delete)' })
  @ApiParam({ name: 'id', description: 'ID de la categoría' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Categoría eliminada' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Categoría no encontrada' })
  remove(@Param('id') id: string) {
    return this.categoriaService.remove(+id);
  }
}