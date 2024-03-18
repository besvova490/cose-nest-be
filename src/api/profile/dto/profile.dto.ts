import { Expose, Transform } from 'class-transformer';

// helpers
import { USER_ROLES } from 'src/constants';

export class ProfileDto {
  @Expose()
  @Transform(({ obj }) => obj.user?.id)
  id: number;

  @Expose()
  @Transform(({ obj }) => obj.user?.email)
  email: string;

  @Expose()
  avatar: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  isTwoFactorAuthEnabled: boolean;

  @Expose()
  type: USER_ROLES;

  @Expose()
  @Transform(({ obj }) => obj.services)
  services: string[];

  @Expose()
  @Transform(({ obj }) => obj.requestedServices)
  requestedServices: string[];
}
