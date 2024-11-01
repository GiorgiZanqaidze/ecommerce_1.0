// src/order/dto/create-order.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  productId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;

  @ApiProperty({ example: 50.0 })
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 1, description: 'User ID who made the order' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 150.5, description: 'Total price of the order' })
  @IsPositive()
  totalPrice: number;

  @ApiProperty({ type: [OrderItemDto], description: 'Order items details' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}
