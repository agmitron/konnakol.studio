import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '~/auth/auth.decorators';
import { AuthenticatedRequest } from '~/auth/auth.types';
import { ContributorRole } from './composition.schema';
import { CompositionService } from './composition.service';

export class RolesGuard implements CanActivate {
  constructor(
    @Inject(CompositionService) private readonly compositionService: CompositionService,
    private readonly reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const caller = request.user;

    const roles = this.reflector.get<ContributorRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const composition = await this.compositionService.findOne(
      request.params.id,
    );

    console.log({ composition, id: request.params.id })

    if (!composition) {
      throw new NotFoundException();
    }

    const isUserGranted = composition.contributors.some(({ role, user }) => {
      return (
        roles.includes(role) && user._id.toString() === caller._id.toString()
      );
    });

    console.log({ isUserGranted })

    if (!isUserGranted) {
      throw new ForbiddenException(
        `This method is only allowed for: ${roles.join(',')}`,
      );
    }

    return true;
  }
}
