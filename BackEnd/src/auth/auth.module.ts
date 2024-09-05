// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module'; // Importe o UserModule aqui

@Module({
  imports: [
    UserModule, // Certifique-se de importar o UserModule
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Substitua pela chave secreta correta
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
