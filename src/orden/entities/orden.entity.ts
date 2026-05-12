import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { OrdenProducto } from '../../orden-producto/entities/orden-producto.entity';

@Entity()
export class Orden {
  @PrimaryGeneratedColumn()
  idOrden: number;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;

  @Column({ type: 'timestamp', nullable: true })
  eliminadoEn: Date | null;

  @ManyToOne(() => Cliente, (cliente) => cliente.ordenes)
  cliente: Cliente;

  @OneToMany(() => OrdenProducto, (ordenProducto) => ordenProducto.orden)
  ordenProductos: OrdenProducto[];
}