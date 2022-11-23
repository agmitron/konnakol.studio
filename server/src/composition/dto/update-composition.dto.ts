import { PartialType } from '@nestjs/mapped-types';
import { CreateCompositionDto } from './create-composition.dto';

export class UpdateCompositionDto extends PartialType(CreateCompositionDto) {}
