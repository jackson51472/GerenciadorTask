import { DataSource } from 'typeorm';
import { Tarefa } from './entities/tarefa.entity';

export const tarefaProviders = [
  {
    provide: 'TAREFA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Tarefa),
    inject: ['DATA_CONNECTION'],
  },
];
