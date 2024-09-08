import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from './auth.dto';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let configService: ConfigService;

  const mockUser = {
    id: '1',
    username: 'john_doe',
    password: bcrypt.hashSync('1234567890', 10),
  };

  const mockUsersService = {
    findByUserName: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('3600'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);

    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    it('deve retornar um token JWT quando as credenciais forem válidas', async () => {
      mockUsersService.findByUserName.mockResolvedValue(mockUser);
      const resultado = await authService.signIn('Jackson', '1234567890');

      expect(resultado).toEqual({
        token: 'mocked-jwt-token',
        expiresIn: 3600,
      });
      expect(usersService.findByUserName).toHaveBeenCalledWith('Jackson');
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        username: mockUser.username,
      });
    });

    it('deve lançar UnauthorizedException se o usuário não for encontrado', async () => {
      mockUsersService.findByUserName.mockResolvedValue(null);

      await expect(
        authService.signIn('usuario_invalido', 'password123'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se a senha estiver incorreta', async () => {
      mockUsersService.findByUserName.mockResolvedValue(mockUser);

      await expect(
        authService.signIn('john_doe', 'senha_errada'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
