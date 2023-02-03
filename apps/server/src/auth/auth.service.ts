import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithoutPassword } from '~/user/user.schema';
import { UserService } from '~/user/user.service';
import { RegisterDTO } from './auth.dto';
import { omitPassword } from '~/user/user.utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} doesn't exist`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      return omitPassword(user);
    }

    return null;
  }

  async register(dto: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(dto.password, 12);

    return this.userService.create({
      email: dto.email,
      name: dto.name,
      password: hashedPassword,
    });
  }
}
