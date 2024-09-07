import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserEntity } from '../db/entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, HttpException, HttpStatus } from '@nestjs/common';
import { mockDeep, mockReset } from 'jest-mock-extended';
import { UsersDto } from './users.dto';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<UserEntity>;

  const mockUser: UserEntity = {
    id: '2002',
    username: 'Cascão',
    passwordHash: 'cebolinha',
    task: null,
  } as UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockDeep<Repository<UserEntity>>(),
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    mockReset(userRepository);
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários filtrados por parâmetros', async () => {
      const users: UserEntity[] = [mockUser];

      userRepository.find = jest.fn().mockResolvedValue(users);

      const result = await userService.findAll({ username: 'Cascão' });
      expect(result).toEqual([
        {
          id: '2002',
          username: 'Cascão',
          password: 'cebolinha',
        },
      ]);
    });
  });

  describe('findById', () => {
    it('deve encontrar um usuário por ID', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.findById('2002');
      expect(result).toEqual({
        id: '2002',
        username: 'Cascão',
        password: 'cebolinha',
      });
    });

    it('deve lançar uma exceção se o usuário não for encontrado', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(userService.findById('2002')).rejects.toThrow(
        new HttpException('User with id 2002 not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('create', () => {
    it('deve criar um novo usuário', async () => {
      const newUser: UserEntity = { ...mockUser, id: '2003' };

      userRepository.save = jest.fn().mockResolvedValue(newUser);
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      const result = await userService.create({
        id: '2003',
        username: 'Cascão',
        password: 'cebolinha',
      });
      expect(result).toEqual({ id: '2003', username: 'Cascão' });
    });

    it('deve lançar uma exceção se o usuário já estiver registrado', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      await expect(
        userService.create({
          id: '2002',
          username: 'Cascão',
          password: 'cebolinha',
        }),
      ).rejects.toThrow(
        new ConflictException("User 'Cascão' already registered"),
      );
    });
  });

  describe('update', () => {
    it('deve atualizar um usuário existente', async () => {
      const updatedUserDto: UsersDto = {
        id: '2002',
        username: 'Cascão',
        password: 'cebolinha',
      };
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);
      userRepository.update = jest.fn().mockResolvedValue(null);

      await userService.update('2002', updatedUserDto);
      expect(userRepository.update).toHaveBeenCalledWith('2002', {
        username: 'Cascão',
        passwordHash: 'cebolinha',
      });
    });

    it('deve lançar uma exceção se o usuário não for encontrado para atualização', async () => {
      const updatedUserDto: UsersDto = {
        id: '2002',
        username: 'Cascão',
        password: 'cebolinha',
      };
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      await expect(userService.update('2002', updatedUserDto)).rejects.toThrow(
        new HttpException(
          "User with id '2002' not found",
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('remove', () => {
    const id_removido = '2002';

    it('deve remover um usuário existente', async () => {
      userRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await userService.remove(id_removido);
      expect(userRepository.delete).toHaveBeenCalledWith(id_removido);
    });

    it('deve lançar uma exceção se o usuário não for encontrado para remoção', async () => {
      userRepository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      await expect(userService.remove(id_removido)).rejects.toThrow(
        new HttpException(
          `User with id ${id_removido} not found`,
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('findByUserName', () => {
    it('deve encontrar um usuário pelo nome de usuário', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await userService.findByUserName('Cascão');
      expect(result).toEqual({
        id: '2002',
        username: 'Cascão',
        password: 'cebolinha',
      });
    });

    it('deve retornar null se o usuário não for encontrado pelo nome de usuário', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);

      const result = await userService.findByUserName('nonexistentuser');
      expect(result).toBeNull();
    });
  });
});
