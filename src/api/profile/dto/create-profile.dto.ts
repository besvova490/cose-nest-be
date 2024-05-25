import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  avatar: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber({}, { each: true })
  services: number[];
}
