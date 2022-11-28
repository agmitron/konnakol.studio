import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocumentLean, UserWithoutPassword } from '~/user/user.schema';
import { UserService } from '~/user/user.service';
import { RegisterDTO } from './auth.dto';

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
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
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

  async createJWT(user: UserDocumentLean) {
    return this.jwtService.sign({ name: user.name, id: user._id });
  }
}
