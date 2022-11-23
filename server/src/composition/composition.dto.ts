import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class CreateCompositionDto {
  @IsString()
  pattern: string;
}

export class UpdateCompositionDto extends PartialType(CreateCompositionDto) {}
