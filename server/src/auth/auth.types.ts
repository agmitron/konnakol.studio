import { Request } from 'express';
import { UserDocumentLean } from '~/user/user.schema';

export interface AuthenticatedRequest extends Request {
  user: UserDocumentLean;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
