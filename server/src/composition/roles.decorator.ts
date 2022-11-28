import { SetMetadata } from '@nestjs/common';
import { ContributorRole } from './composition.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ContributorRole[]) =>
  SetMetadata(ROLES_KEY, roles);
