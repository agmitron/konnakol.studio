import { Module } from '@nestjs/common';
import { Request } from 'express';
import { UsersModule } from '~/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { User } from '~/users/users.service';

export interface AuthenticatedRequest extends Request {
  user: User;
}

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
