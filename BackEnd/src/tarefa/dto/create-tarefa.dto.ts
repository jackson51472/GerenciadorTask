import { User } from '../../user/entities/user.entity';

export class CreateTarefaDto {
  titulo: string;
  descricao: string;
  status: boolean;
  user: User;
}
