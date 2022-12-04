import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedRequest } from '~/auth/auth.types';
import { JwtAuthGuard } from '~/auth/jwt.guard';
import { CompositionService } from './composition.service';
import {
  CreateCompositionDto,
  UpdateCompositionContributorsDto,
  UpdateCompositionDto,
} from './composition.dto';
import { RolesGuard } from './roles.guard';
import { ContributorRole } from './composition.schema';
import { Roles } from './roles.decorator';

@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: CreateCompositionDto,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.compositionService.create(body, request.user);
  }

  @Get()
  findAll() {
    return this.compositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compositionService.findOne(id);
  }

  @Roles(ContributorRole.Editor, ContributorRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompositionDto: UpdateCompositionDto,
  ) {
    return this.compositionService.update(id, updateCompositionDto);
  }

  @Roles(ContributorRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/contributors')
  updateContributors(
    @Param('id') id: string,
    @Body() body: UpdateCompositionContributorsDto,
  ) {
    return this.compositionService.updateContributors(id, body);
  }

  @Roles(ContributorRole.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compositionService.remove(id);
  }
}
