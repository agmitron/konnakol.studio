import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '~/user/user.schema';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ ref: 'User' })
  user: User;

  @Prop()
  refresh: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
