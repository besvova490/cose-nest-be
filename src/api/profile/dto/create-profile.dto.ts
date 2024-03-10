import { IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  avatar: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
