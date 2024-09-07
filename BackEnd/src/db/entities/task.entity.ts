import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

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

  @ManyToOne(() => TaskEntity, (task) => task.user)
  user: UserEntity;
}
