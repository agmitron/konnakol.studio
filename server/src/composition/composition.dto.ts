import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCompositionDto {
  @IsString()
  name: string;

  @IsString()
  pattern: string;

  @IsNumber()
  @IsPositive()
  bpm: number;
}

export class UpdateCompositionDto extends PartialType(CreateCompositionDto) {}
