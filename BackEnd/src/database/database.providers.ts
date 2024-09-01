import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATA_CONNECTION',
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'mysql', // Mantém o tipo como 'mysql'
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'gerenciador_task',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
