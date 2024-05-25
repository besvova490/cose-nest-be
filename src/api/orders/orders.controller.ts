import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

// dtos
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

// interceptors
import { Serialize } from '../../interceptors/serialize.interceptor';

@Serialize(OrderDto)
@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll(
    @Query('coordinatesFrom') coordinatesFrom: string,
    @Query('coordinatesTo') coordinatesTo: string,
  ) {
    return this.ordersService.findAll({
      params: {
        coordinatesFrom,
        coordinatesTo,
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
