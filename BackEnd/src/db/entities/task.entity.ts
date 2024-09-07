import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tarefa' })
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  status: string;

  @Column({ type: 'datetime', name: 'expiration_date' })
  expirationDate: Date;
}
