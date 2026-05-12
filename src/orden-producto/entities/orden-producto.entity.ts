import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Orden } from '../../orden/entities/orden.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('orden_producto')
export class OrdenProducto {
  @PrimaryGeneratedColumn()
  idOrdenProducto: number;

  @ManyToOne(() => Orden, (orden) => orden.ordenProductos)
  orden: Orden;

  @ManyToOne(() => Producto, (producto) => producto.ordenProductos)
  producto: Producto;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario: number;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;

  @Column({ type: 'timestamp', nullable: true })
  eliminadoEn: Date | null;
}