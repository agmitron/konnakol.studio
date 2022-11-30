import {
  Body,
  Controller,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { HOUR, MINUTE, MONTH, SECOND } from '~/constants';
import { TokenService } from '~/token/token.service';
import { Cookies } from './auth.decorators';
import { RegisterDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthenticatedRequest } from './auth.types';
import { LocalAuthGuard } from './local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh, access } = this.tokenService.generate(request.user);
    response.cookie('refresh', refresh, { httpOnly: true, maxAge: MONTH });
    response.cookie('access', access, { httpOnly: true, maxAge: SECOND * 30 });
    await this.tokenService.store(request.user._id, refresh);
    // return access;
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('refresh')
  async refresh(@Cookies('refresh') token: string) {
    return this.tokenService.refresh(token);
  }
}
