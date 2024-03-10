import { IsString, IsEmail } from 'class-validator';

// dtos
import { CreateProfileDto } from 'src/api/profile/dto/create-profile.dto';

export class RegisterAuthDto extends CreateProfileDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
