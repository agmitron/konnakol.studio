import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findById(id: string) {
    return this.userModel.findById(id).lean().exec();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async create(user: User) {
    const isUserExist = await this.userModel.exists({ email: user.email });

    if (isUserExist) {
      throw new ConflictException(
        `User with email ${user.email} already exists.`,
      );
    }

    return this.userModel
      .create(user)
      .then((u) => u.save())
      .then((u) => u._id);
  }
}
