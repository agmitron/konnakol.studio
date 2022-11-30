import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User, UserDocument } from '~/user/user.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: UserDocument;

  @Prop()
  refresh: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
