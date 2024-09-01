import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Tarefa } from '../../tarefa/entities/tarefa.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  password: string;

  @Column()
  login: string;

  @OneToMany(() => Tarefa, (tarefa) => tarefa.user)
  tarefas: Tarefa[];
}
