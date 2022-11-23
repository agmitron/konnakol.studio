import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserDocument } from '~/user/user.schema';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (request: any) => {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

        console.log({ token })

        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ id, name }: UserDocument) {
    return { id, name };
  }
}
