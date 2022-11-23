import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '~/user/user.schema';

type JSONString = string;

export type CompositionDocument = mongoose.HydratedDocument<Composition>;

@Schema()
export class Composition {
  @Prop()
  pattern: JSONString;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  authors: User[];
}

export const CompositionSchema = SchemaFactory.createForClass(Composition);
