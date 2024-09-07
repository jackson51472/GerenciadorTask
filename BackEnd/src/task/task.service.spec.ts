import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { TaskEntity } from '../db/entities/task.entity';
import { UserEntity } from '../db/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskDto, TaskStatusEnum, FindAllParameters } from './task.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

describe('TaskService', () => {
  let service: TaskService;
  let taskRepository: Repository<TaskEntity>;
  let userRepository: Repository<UserEntity>;

  const mockUserEntity: UserEntity = {
    task: undefined,
    id: '123',
    username: 'Usuário Exemplo',
    passwordHash: 'senha123',
  };

  const mockTaskEntity: TaskEntity = {
    id: '1',
    title: 'Tarefa Exemplo',
    description: 'Descrição da tarefa',
    expirationDate: new Date(),
    status: TaskStatusEnum.TO_DO,
    user: mockUserEntity,
  };

  const mockTaskDto: TaskDto = {
    id: '1',
    title: 'Tarefa Exemplo',
    description: 'Descrição da tarefa',
    expirationDate: new Date(),
    status: TaskStatusEnum.TO_DO,
    user: mockUserEntity,
  };

  const setupMocks = () => {
    jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTaskEntity);
    jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTaskEntity);
    jest.spyOn(taskRepository, 'find').mockResolvedValue([mockTaskEntity]);
    jest.spyOn(taskRepository, 'update').mockResolvedValue(undefined);
    jest.spyOn(taskRepository, 'delete').mockResolvedValue({
      affected: 1,
      raw: {},
    } as DeleteResult);

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUserEntity);
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
    taskRepository = module.get<Repository<TaskEntity>>(
      getRepositoryToken(TaskEntity),
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    setupMocks();
  });

  describe('create', () => {
    it('deve criar uma nova tarefa com usuário associado', async () => {
      const result = await service.create(mockTaskDto);
      expect(result).toEqual(mockTaskDto);
      expect(taskRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          title: mockTaskDto.title,
          description: mockTaskDto.description,
          expirationDate: mockTaskDto.expirationDate,
          status: TaskStatusEnum.TO_DO,
          user: mockUserEntity,
        }),
      );
    });
  });

  describe('findById', () => {
    it('deve retornar a tarefa pelo ID', async () => {
      const result = await service.findById('1');
      expect(result).toEqual(mockTaskDto);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('deve lançar uma exceção se a tarefa não for encontrada', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findById('1')).rejects.toThrow(
        new HttpException('Task with id 1 not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as tarefas com parâmetros de busca', async () => {
      const params: FindAllParameters = { title: 'Exemplo', status: 'TO_DO' };

      const result = await service.findAll(params);

      expect(result).toEqual([mockTaskDto]);

      expect(taskRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            title: expect.objectContaining({ _type: 'like' }),
            status: expect.objectContaining({ _type: 'like' }),
          },
        }),
      );
    });
  });

  describe('update', () => {
    it('deve atualizar uma tarefa existente', async () => {
      const updatedTaskDto: TaskDto = { ...mockTaskDto, title: 'Nova Tarefa' };
      await service.update('1', updatedTaskDto);
      expect(taskRepository.update).toHaveBeenCalledWith(
        '1',
        expect.objectContaining({
          title: 'Nova Tarefa',
          description: updatedTaskDto.description,
          expirationDate: updatedTaskDto.expirationDate,
          status: updatedTaskDto.status.toString(),
          user: mockUserEntity,
        }),
      );
    });

    it('deve lançar uma exceção se a tarefa não for encontrada', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);
      await expect(service.update('1', mockTaskDto)).rejects.toThrow(
        new HttpException(`Task with id '1' not found`, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('remove', () => {
    it('deve remover uma tarefa existente', async () => {
      await service.remove('1');
      expect(taskRepository.delete).toHaveBeenCalledWith('1');
    });

    it('deve lançar uma exceção se a tarefa não for encontrada', async () => {
      jest
        .spyOn(taskRepository, 'delete')
        .mockResolvedValue({ affected: 0, raw: {} } as DeleteResult);
      await expect(service.remove('1')).rejects.toThrow(
        new HttpException(`Task with id '1' not found`, HttpStatus.BAD_REQUEST),
      );
    });
  });
});
