import { Transform, Expose } from 'class-transformer';

// helper
import { OrderPaymentType } from '../entities/order.entity';

export class OrderDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  title: string;

  @Expose()
  paymentType: OrderPaymentType;

  @Expose()
  orderDate: string;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  note: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.service?.id
      ? {
          id: obj.service?.id,
          name: obj.service?.name,
        }
      : null,
  )
  service: {
    id: number;
    name: string;
  } | null;
}
