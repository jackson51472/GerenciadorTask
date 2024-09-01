import { Inject, Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Repository } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';

@Injectable()
export class TarefaService {
  constructor(
    @Inject('TAREFA_REPOSITORY')
    private tarefaRepository: Repository<Tarefa>,
  ) {}

  async findAll(): Promise<Tarefa[]> {
    return this.tarefaRepository.find();
  }

  create(createTarefaDto: CreateTarefaDto) {
    return 'This action adds a new tarefa';
  }

  findOne(id: number) {
    return `This action returns a #${id} tarefa`;
  }

  update(id: number, updateTarefaDto: UpdateTarefaDto) {
    return `This action updates a #${id} tarefa`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarefa`;
  }
}
