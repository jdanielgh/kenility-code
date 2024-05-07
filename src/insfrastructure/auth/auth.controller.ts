import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

interface Login {
  username: string;
  userId: string;
}


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() user: Login) {
    return this.authService.login(user);
  }
}