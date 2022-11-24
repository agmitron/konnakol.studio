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
import { CreateCompositionDto, UpdateCompositionDto } from './composition.dto';

@Controller('composition')
export class CompositionController {
  constructor(private readonly compositionService: CompositionService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: CreateCompositionDto,
    @Request() request: AuthenticatedRequest,
  ) {
    return this.compositionService.create(body, [request.user]);
  }

  @Get()
  findAll() {
    return this.compositionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compositionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompositionDto: UpdateCompositionDto,
  ) {
    return this.compositionService.update(id, updateCompositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compositionService.remove(id);
  }
}
