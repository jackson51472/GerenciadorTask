// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Aqui definimos a rota base "/auth"
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Aqui definimos a rota "/login" dentro de "/auth"
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login(loginDto);
  }
}
