import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { DatabaseModule } from '../database/database.module';
import { tarefaProviders } from './tarefa.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TarefaController],
  providers: [TarefaService, ...tarefaProviders],
})
export class TarefaModule {}
