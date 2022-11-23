import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './auth.types';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }
}
