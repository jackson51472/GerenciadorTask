import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import {
  TaskDto,
  FindAllParameters,
  TaskRouteParameters,
  TaskStatusEnum,
} from './task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UserEntity } from '../db/entities/user.entity';

describe('TaskController', () => {
  let taskController: TaskController;
  let taskService: TaskService;

  const mockTaskService = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockUser: UserEntity = {
    id: '123',
    username: 'Cascão',
    passwordHash: '1234567890',
    task: null,
  };

  const mockTaskDto: TaskDto = {
    id: '1',
    title: 'Task',
    description: 'description',
    expirationDate: new Date(),
    status: TaskStatusEnum.TO_DO,
    user: mockUser,
  };

  const mockParams: TaskRouteParameters = { id: '1' };

  const mockFindAllParams: FindAllParameters = {
    title: 'mudei',
    status: TaskStatusEnum.TO_DO,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: mockTaskService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    taskController = module.get<TaskController>(TaskController);
    taskService = module.get<TaskService>(TaskService);

    jest.clearAllMocks();
  });

  it('deve ser definida tarefa', () => {
    expect(taskController).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma nova tarefa', async () => {
      mockTaskService.create.mockResolvedValue(mockTaskDto);

      const result = await taskController.create(mockTaskDto);
      expect(result).toEqual(mockTaskDto);
      expect(mockTaskService.create).toHaveBeenCalledWith(mockTaskDto);
    });
  });

  describe('findById', () => {
    it('deve retornar uma tarefa por id', async () => {
      mockTaskService.findById.mockResolvedValue(mockTaskDto);

      const result = await taskController.findById(mockParams.id);
      expect(result).toEqual(mockTaskDto);
      expect(mockTaskService.findById).toHaveBeenCalledWith(mockParams.id);
    });
  });

  describe('findAll', () => {
    it('deve retornar todas as tarefas com parâmetros fornecidos', async () => {
      const mockTaskList: TaskDto[] = [
        { ...mockTaskDto, title: 'Task 1' },
        { ...mockTaskDto, title: 'Task 2' },
      ];
      mockTaskService.findAll.mockResolvedValue(mockTaskList);

      const result = await taskController.findAll(mockFindAllParams);
      expect(result).toEqual(mockTaskList);
      expect(mockTaskService.findAll).toHaveBeenCalledWith(mockFindAllParams);
    });
  });

  describe('update', () => {
    it('deve atualizar uma tarefa', async () => {
      await taskController.update(mockParams, mockTaskDto);
      expect(mockTaskService.update).toHaveBeenCalledWith(
        mockParams.id,
        mockTaskDto,
      );
    });
  });

  describe('remove', () => {
    it('deve remover uma tarefa por id', async () => {
      await taskController.remove(mockParams);
      expect(mockTaskService.remove).toHaveBeenCalledWith(mockParams.id);
    });
  });
});
