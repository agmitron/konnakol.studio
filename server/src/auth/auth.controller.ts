import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ENV, MONTH } from '~/constants';
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
    private readonly configService: ConfigService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh, access } = this.tokenService.generate(request.user);
    await this.tokenService.store(request.user._id, refresh);
    this.setTokensToCookie(response, refresh);
    return access;
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Get('refresh')
  async refresh(
    @Cookies('refresh') token: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh, access } = await this.tokenService.refresh(token);
    this.setTokensToCookie(response, refresh);
    return access;
  }

  private setTokensToCookie(response: Response, refresh: string) {
    response.cookie('refresh', refresh, {
      httpOnly: true,
      maxAge: MONTH,
      sameSite: 'strict',
      domain: this.configService.get(ENV.DOMAIN),
    });
  }
}
