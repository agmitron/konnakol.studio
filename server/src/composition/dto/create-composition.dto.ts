import { IsString } from 'class-validator';

export class CreateCompositionDto {
  @IsString()
  pattern: string;
}
