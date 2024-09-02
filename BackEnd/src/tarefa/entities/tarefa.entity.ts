import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titulo: string;

  @Column({ length: 255 })
  descricao: string;

  @Column()
  status: boolean;

  @ManyToOne(() => User, (user) => user.tarefas)
  user: User;
}
