import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  idProducto: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;

  @Column({ type: 'timestamp', nullable: true })
  eliminadoEn: Date | null;

  @ManyToOne(() => Categoria, (categoria) => categoria.productos)
  categoria: Categoria;

  @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.producto)
  ordenProductos: OrdenProducto[];
}