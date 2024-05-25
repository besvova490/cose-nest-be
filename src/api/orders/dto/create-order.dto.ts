import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Matches,
} from 'class-validator';

// helper
import { OrderPaymentType } from '../entities/order.entity';

export class CreateOrderDto {
  @IsNumber()
  price: number;

  @IsString()
  title: string;

  @IsString()
  @IsEnum(OrderPaymentType)
  paymentType: OrderPaymentType;

  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  orderDate: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  note: string;

  @IsNumber()
  serviceId: number;
}
