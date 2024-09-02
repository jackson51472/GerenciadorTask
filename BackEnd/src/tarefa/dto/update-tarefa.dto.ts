import { PartialType } from '@nestjs/mapped-types';
import { CreateTarefaDto } from './create-tarefa.dto';
import { User } from '../../user/entities/user.entity';
export class UpdateTarefaDto extends PartialType(CreateTarefaDto) {
  titulo: string;
  descricao: string;
  status: boolean;
  user: User;
}
