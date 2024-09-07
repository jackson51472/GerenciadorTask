import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', name: 'password_hash' })
  passwordHash: string;

  @OneToOne(() => TaskEntity, (task) => task.user)
  task: TaskEntity;
}
