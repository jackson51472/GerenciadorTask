import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it('deve ser definido', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('deve retornar um token JWT quando chamado com credenciais corretas', async () => {
      const mockResponse: AuthResponseDto = {
        token: 'mocked-jwt-token',
        expiresIn: 3600,
      };

      mockAuthService.signIn.mockResolvedValue(mockResponse);

      const result = await authController.signIn('john_doe', 'password123');
      expect(result).toEqual(mockResponse);
      expect(authService.signIn).toHaveBeenCalledWith(
        'john_doe',
        'password123',
      );
    });
  });
});
