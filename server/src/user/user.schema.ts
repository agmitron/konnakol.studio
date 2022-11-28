import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, LeanDocument } from 'mongoose';

export type UserWithoutPassword = Omit<User, 'password'>;
export type UserDocument = HydratedDocument<User>;
export type UserDocumentLean = LeanDocument<UserDocument>;

@Schema()
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
