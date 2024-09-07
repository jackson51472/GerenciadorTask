import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {
  UsersDto,
  CreateUserResponse,
  FindAllParameters,
  UserRouteParameters,
} from './users.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  const mockUser: UsersDto = {
    id: '2002',
    username: 'Cascão',
    password: 'cebolinha',
  };

  const mockResponse: CreateUserResponse = {
    id: '2002',
    username: 'Cascão',
  };

  const mockParams: UserRouteParameters = {
    id: '2002',
  };

  const mockFindAllParams: FindAllParameters = {
    username: 'Cascão',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      jest.spyOn(userService, 'create').mockResolvedValue(mockResponse);

      const result = await userController.create(mockUser);
      expect(result).toEqual(mockResponse);
      expect(userService.create).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('findById', () => {
    it('deve encontrar um usuário por ID', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(mockUser);

      const result = await userController.findById('2002');
      expect(result).toEqual(mockUser);
      expect(userService.findById).toHaveBeenCalledWith('2002');
    });

    it('deve lançar uma exceção se o usuário não for encontrado', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValue(null);

      try {
        await userController.findById('2002');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('User with id 2002 not found');
        expect(error.status).toEqual(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários filtrados por parâmetros', async () => {
      jest.spyOn(userService, 'findAll').mockResolvedValue([mockUser]);

      const result = await userController.findAll(mockFindAllParams);
      expect(result).toEqual([mockUser]);
      expect(userService.findAll).toHaveBeenCalledWith(mockFindAllParams);
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário existente', async () => {
      jest.spyOn(userService, 'update').mockResolvedValue(undefined);

      await userController.update(mockParams, mockUser);
      expect(userService.update).toHaveBeenCalledWith(mockParams.id, mockUser);
    });

    it('deve lançar uma exceção se o usuário não for encontrado para atualização', async () => {
      jest
        .spyOn(userService, 'update')
        .mockRejectedValue(
          new HttpException(
            "User with id '2002' not found",
            HttpStatus.BAD_REQUEST,
          ),
        );

      await expect(userController.update(mockParams, mockUser)).rejects.toThrow(
        new HttpException(
          "User with id '2002' not found",
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('remove', () => {
    it('deve remover um usuário existente', async () => {
      jest.spyOn(userService, 'remove').mockResolvedValue(undefined);

      await userController.remove(mockParams);
      expect(userService.remove).toHaveBeenCalledWith(mockParams.id);
    });

    it('deve lançar uma exceção se o usuário não for encontrado para remoção', async () => {
      jest
        .spyOn(userService, 'remove')
        .mockRejectedValue(
          new HttpException(
            `User with id ${mockParams.id} not found`,
            HttpStatus.BAD_REQUEST,
          ),
        );

      await expect(userController.remove(mockParams)).rejects.toThrow(
        new HttpException(
          `User with id ${mockParams.id} not found`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });
});
