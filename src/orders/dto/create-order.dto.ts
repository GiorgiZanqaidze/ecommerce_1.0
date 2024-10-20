import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsArray()
  orderItems: OrderItemDto[];
}
