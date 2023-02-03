import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User, UserDocument } from '~/user/user.schema';
import { omitPassword } from '~/user/user.utils';
import { Token, TokenDocument } from './token.schema';

export interface TokenPayload {
  _id: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Token.name)
    private readonly tokenModel: Model<TokenDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) { }

  generate(payload: string | object | Buffer) {
    return {
      access: this.jwtService.sign(payload, { expiresIn: '30m' }),
      refresh: this.jwtService.sign({}, { expiresIn: '30d' }),
    };
  }

  validate(token: string) {
    return this.jwtService.verify<TokenPayload>(token);
  }

  async store(userID: mongoose.Types.ObjectId, refresh: string) {
    const foundToken = await this.tokenModel.findOne({ user: userID });

    if (foundToken) {
      foundToken.refresh = refresh;
      return await foundToken.save();
    }

    return await this.tokenModel.create({
      user: userID,
      refresh,
    });
  }

  async refresh(token: string) {
    const userData = this.validate(token);
    const foundToken = await this.tokenModel
      .findOne({ refresh: token })
      .populate('user')
      .lean();

    if (!token || !userData || !foundToken) {
      throw new UnauthorizedException();
    }

    const tokens = this.generate(omitPassword(foundToken.user));
    await this.store(foundToken.user._id, tokens.refresh);
    return tokens;
  }
}
