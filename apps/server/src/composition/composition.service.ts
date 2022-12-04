import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocumentLean } from '~/user/user.schema';
import {
  Composition,
  CompositionDocument,
  ContributorRole,
} from './composition.schema';
import {
  CreateCompositionDto,
  UpdateCompositionContributorsDto,
  UpdateCompositionDto,
} from './composition.dto';

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

  update(id: string, body: UpdateCompositionDto) {
    return this.compositionModel.findByIdAndUpdate(id, body).lean().exec();
  }

  async updateContributors(
    compositionId: string,
    body: UpdateCompositionContributorsDto,
  ) {
    if (!body.contributors.some((c) => c.role === ContributorRole.Admin)) {
      throw new BadRequestException(
        'At least one of contributors must be an admin.',
      );
    }

    return this.compositionModel
      .findByIdAndUpdate(
        compositionId,
        {
          $set: {
            contributors: body.contributors,
          },
        },
        { new: true },
      )
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.compositionModel.findByIdAndRemove(id).exec();
  }
}
