import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { DatabaseModule } from '../database/database.module';
import { tarefaProviders } from './tarefa.providers';
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [TarefaController],
  providers: [TarefaService, ...tarefaProviders],
})
export class TarefaModule {}
