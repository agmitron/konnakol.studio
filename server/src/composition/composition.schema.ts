import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { UserDocument, UserDocumentLean } from '~/user/user.schema';

type JSONString = string;

export type CompositionDocument = mongoose.HydratedDocument<Composition>;

export enum ContributorRole {
  Admin,
  Editor,
  Viewer,
}

export interface Contributor {
  user: UserDocument;
  role: ContributorRole;
}

@Schema()
export class Composition {
  @Prop({ required: true })
  pattern: JSONString;

  @Prop({
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: {
          type: mongoose.Schema.Types.Number,
          enum: ContributorRole,
          default: ContributorRole.Viewer,
        },
      },
    ],
    required: true,
  })
  contributors: Contributor[];

  @Prop({ required: true })
  bpm: number;
}

export const CompositionSchema = SchemaFactory.createForClass(Composition);
