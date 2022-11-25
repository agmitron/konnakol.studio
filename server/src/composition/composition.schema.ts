import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from '~/user/user.schema';

type JSONString = string;

export type CompositionDocument = mongoose.HydratedDocument<Composition>;

export enum ContributorRole {
  Admin = 'admin',
  Editor = 'editor',
  Viewer = 'viewer',
}

export interface Contributor<
  U extends
    | UserDocument
    | User
    | mongoose.Schema.Types.ObjectId
    | string = UserDocument,
> {
  user: U;
  role: ContributorRole;
}

@Schema()
export class Composition {
  @Prop({ required: true })
  pattern: JSONString;

  @Prop({
    type: [
      new mongoose.Schema(
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          role: {
            type: mongoose.Schema.Types.String,
            enum: ContributorRole,
            default: ContributorRole.Viewer,
          },
        },
        {
          _id: false,
        },
      ),
    ],
    required: true,
  })
  contributors: Contributor[];

  @Prop({ required: true })
  bpm: number;
}

export const CompositionSchema = SchemaFactory.createForClass(Composition);
