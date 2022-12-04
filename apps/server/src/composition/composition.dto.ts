import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Contributor, ContributorRole } from './composition.schema';

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

class ContributorParam implements Contributor<string> {
  @IsEnum(ContributorRole)
  role: ContributorRole;

  @IsString()
  user: string;
}

export class UpdateCompositionContributorsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ContributorParam)
  contributors: Array<ContributorParam>;
}
