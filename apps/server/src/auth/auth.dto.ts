import { IsString } from 'class-validator';

export class RegisterDTO {
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}
