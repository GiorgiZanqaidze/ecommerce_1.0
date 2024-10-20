import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsArray } from 'class-validator';
import { OrderItemDto } from './order-item.dto';

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: 'Updated total price of the order' })
  @IsOptional()
  @IsNumber()
  totalPrice?: number;

  @ApiPropertyOptional({ description: 'Updated list of order items' })
  @IsOptional()
  @IsArray()
  orderItems?: OrderItemDto[];
}
