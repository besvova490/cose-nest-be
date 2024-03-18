import { IsString, IsNumber } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  avatar: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber({}, { each: true })
  services: number[];
}
