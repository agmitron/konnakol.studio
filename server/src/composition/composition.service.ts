import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '~/user/user.entity';
import { Composition, CompositionDocument } from './composition.schema';
import { CreateCompositionDto } from './dto/create-composition.dto';
import { UpdateCompositionDto } from './dto/update-composition.dto';

@Injectable()
export class CompositionService {
  constructor(
    @InjectModel(Composition.name)
    private compositionModel: Model<CompositionDocument>,
  ) {}

  create({ pattern }: CreateCompositionDto, authors: User[]) {
    const createdComposition = new this.compositionModel({
      pattern,
      authors,
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
