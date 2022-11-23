import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByName(name: string): Promise<User | null> {
    return this.userModel.findOne({ name }).exec();
  }

  async create(user: User) {
    return this.userModel.create(user).then((u) => u.save());
  }
}
