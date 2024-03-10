import { Expose, Transform } from 'class-transformer';

// helpers
import { USER_ROLES } from 'src/constants';

export class ProfileDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.profile.avatar)
  avatar: string;

  @Expose()
  @Transform(({ obj }) => obj.profile.firstName)
  firstName: string;

  @Expose()
  @Transform(({ obj }) => obj.profile.lastName)
  lastName: string;

  @Expose()
  @Transform(({ obj }) => obj.profile.isTwoFactorAuthEnabled)
  isTwoFactorAuthEnabled: boolean;

  @Expose()
  @Transform(({ obj }) => obj.profile.type)
  type: USER_ROLES;
}
