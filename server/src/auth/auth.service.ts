import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument, UserWithoutPassword } from '~/user/user.schema';
import { UserService } from '~/user/user.service';
import { RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(
    name: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findByName(name);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserDocument) {
    const payload = { name: user.name, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async register(dto: RegisterDTO) {
    console.log({ dto })
    return this.userService.create(dto);
  }
}
