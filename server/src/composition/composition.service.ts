import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumentLean } from '~/user/user.schema';
import {
  Composition,
  CompositionDocument,
  ContributorRole,
} from './composition.schema';
import { CreateCompositionDto, UpdateCompositionDto } from './composition.dto';

@Injectable()
export class CompositionService {
  constructor(
    @InjectModel(Composition.name)
    private compositionModel: Model<CompositionDocument>,
  ) {}

  create(body: CreateCompositionDto, author: UserDocumentLean) {
    const createdComposition = new this.compositionModel({
      ...body,
      contributors: [{ user: author._id, role: ContributorRole.Admin }],
    });

    return createdComposition.save();
  }

  findAll(): Promise<Composition[]> {
    return this.compositionModel.find().exec();
  }

  findOne(id: string) {
    return this.compositionModel.findById(id).exec();
  }

  update(id: string, body: UpdateCompositionDto, editor: UserDocumentLean) {
    return this.compositionModel.findByIdAndUpdate(id, {
      ...body,
      $addToSet: {
        contributors: [editor._id],
      },
    });
  }

  async remove(id: string, caller: UserDocumentLean) {
    const composition = await this.compositionModel
      .findById(id)
      .populate('contributors.user');

    if (!composition) {
      throw new NotFoundException();
    }

    const isUserGranted = composition.contributors.some(({ role, user }) => {
      return (
        role === ContributorRole.Admin &&
        user._id.toString() === caller._id.toString()
      );
    });

    if (!isUserGranted) {
      throw new ForbiddenException('You must be an admin of this composition.');
    }

    return this.compositionModel.findByIdAndRemove(id).exec();
  }
}
