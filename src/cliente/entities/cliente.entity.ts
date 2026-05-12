import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Orden } from '../../orden/entities/orden.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  idCliente: number;

  @Column({ type: 'varchar', length: 100 })
  nombres: string;

  @Column({ type: 'varchar', length: 50 })
  paterno: string;

  @Column({ type: 'varchar', length: 50 })
  materno: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  actualizadoEn: Date;

  @Column({ type: 'timestamp', nullable: true })
  eliminadoEn: Date | null;

  @OneToMany(() => Orden, (orden) => orden.cliente)
  ordenes: Orden[];
}