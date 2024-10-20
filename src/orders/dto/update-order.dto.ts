import { IsOptional, IsNumber, IsArray } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @IsOptional()
  @IsArray()
  orderItems?: OrderItemDto[];
}
