import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenService } from './orden.service';
import { OrdenController } from './orden.controller';
import { Orden } from './entities/orden.entity';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Producto } from '../producto/entities/producto.entity';
import { OrdenProducto } from '../orden-producto/entities/orden-producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orden, Cliente, Producto, OrdenProducto])],
  controllers: [OrdenController],
  providers: [OrdenService],
})
export class OrdenModule {}