import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { Repository } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TarefaService {
  constructor(
    @Inject('TAREFA_REPOSITORY') private tarefaRepository: Repository<Tarefa>,
    private readonly http: HttpService,
  ) {}

  // Exemplo de busca de tarefas via API externa
  async findAll() {
    return await this.tarefaRepository.find();
  }

  async create(dtoCreate: CreateTarefaDto) {
    const tarefa = new Tarefa();
    tarefa.user = dtoCreate.user;
    tarefa.descricao = dtoCreate.descricao;
    tarefa.titulo = dtoCreate.titulo;
    tarefa.status = dtoCreate.status;

    await this.tarefaRepository.save(tarefa);
    return tarefa; // Retorna o objeto salvo
  }

  async findOne(id: number) {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });
    if (!tarefa) {
      throw new NotFoundException(`Tarefa com o ID #${id} não foi encontrada.`);
    }
    return tarefa;
  }

  async update(id: number, updateTarefaDto: UpdateTarefaDto) {
    const tarefa = await this.tarefaRepository.preload({
      id,
      ...updateTarefaDto,
    });

    if (!tarefa) {
      throw new NotFoundException(`Tarefa com o ID #${id} não foi encontrada.`);
    }

    await this.tarefaRepository.save(tarefa);
    return tarefa; // Retorna a tarefa atualizada
  }

  async remove(id: number) {
    const tarefa = await this.tarefaRepository.findOne({ where: { id } });

    if (!tarefa) {
      throw new NotFoundException(`Tarefa com o ID #${id} não foi encontrada.`);
    }

    await this.tarefaRepository.remove(tarefa);
    return { message: `Tarefa com o ID #${id} foi removida com sucesso.` };
  }
}
