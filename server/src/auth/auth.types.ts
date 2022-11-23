import { Request } from 'express';
import { UserDocument } from '~/user/user.schema';

export interface AuthenticatedRequest extends Request {
  user: UserDocument;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
