import { IsNumber, ArrayNotEmpty } from 'class-validator';

export class ServiceAddChampionDto {
  @IsNumber({}, { each: true })
  @ArrayNotEmpty({ message: 'services should not be empty' })
  services: number[];
}
