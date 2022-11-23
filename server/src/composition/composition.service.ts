import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '~/user/user.schema';
import { Composition, CompositionDocument } from './composition.schema';
import { CreateCompositionDto, UpdateCompositionDto } from './composition.dto';

@Injectable()
export class CompositionService {
  constructor(
    @InjectModel(Composition.name)
    private compositionModel: Model<CompositionDocument>,
  ) { }

  create({ pattern }: CreateCompositionDto, authors: UserDocument[]) {
    const createdComposition = new this.compositionModel({
      pattern,
      authors: authors.map(({ id }) => id),
    });

    return createdComposition.save();
  }

  findAll(): Promise<Composition[]> {
    return this.compositionModel.find().exec();
  }

  findOne(id: string) {
    return this.compositionModel.findById(id).exec();
  }

  update(id: string, updateCompositionDto: UpdateCompositionDto) {
    return this.compositionModel.findByIdAndUpdate(id, updateCompositionDto);
  }

  remove(id: string) {
    return this.compositionModel.findByIdAndRemove(id).exec();
  }
}
