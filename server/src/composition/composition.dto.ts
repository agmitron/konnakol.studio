import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

export class CreateCompositionDto {
  @IsString()
  name: string;

  @IsString()
  pattern: string;

  @IsNumber()
  bpm: number;
}

export class UpdateCompositionDto extends PartialType(CreateCompositionDto) {}
