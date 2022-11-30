import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '~/user/user.service';
import { ENV } from '~/constants';

interface JWTPayload {
  _id: string;
  name: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access ?? null,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENV.JWT_SECRET),
    });
  }

  async validate(payload: JWTPayload) {
    const user = await this.userService.findById(payload._id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
