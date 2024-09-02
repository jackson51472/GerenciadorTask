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

  create(dtoCreate: CreateTarefaDto) {
    const tarefa = new Tarefa();
    tarefa.user = dtoCreate.user;
    tarefa.descricao = dtoCreate.descricao;
    tarefa.titulo = dtoCreate.titulo;
    tarefa.status = dtoCreate.status;
    this.tarefaRepository.save(tarefa);
    return 'Tarefa salva com sucesso';
  }

  findOne(id: number) {
    return `This action returns a #${id} tarefa`;
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto) {
    await this.tarefaRepository.update(id, {
      titulo: updateTarefaDto.titulo,
      descricao: updateTarefaDto.descricao,
      status: updateTarefaDto.status,
      user: updateTarefaDto.user,
    });
    return `This action updates a #${id} tarefa`;
  }

  async remove(id: number) {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });

    if (!tarefa) {
      return `Tarefa com o ID #${id} não foi encontrado.`;
    }

    await this.tarefaRepository.remove(tarefa);

    return `This action removes a #${id} tarefa`;
  }
}
