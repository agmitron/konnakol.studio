import { Request } from 'express';
import { User } from '~/users/users.service';

export interface AuthenticatedRequest extends Request {
  user: User;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}
