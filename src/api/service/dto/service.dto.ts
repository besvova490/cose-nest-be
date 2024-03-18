import { Expose, Transform } from 'class-transformer';

export class ServiceDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Transform(({ obj }) => obj.logo?.url || null)
  logo: string;
}
