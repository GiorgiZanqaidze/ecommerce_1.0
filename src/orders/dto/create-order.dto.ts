import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsArray } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID of the user placing the order' })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({ description: 'Total price of the order' })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty({ description: 'List of order items' })
  @IsArray()
  orderItems: OrderItemDto[];
}
