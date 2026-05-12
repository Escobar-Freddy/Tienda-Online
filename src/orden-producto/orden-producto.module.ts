import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenProducto } from './entities/orden-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenProducto])],
})
export class OrdenProductoModule {}