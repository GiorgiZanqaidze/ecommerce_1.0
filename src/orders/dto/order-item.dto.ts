import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderItemDto {
  @ApiProperty({ description: 'ID of the product' })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Quantity of the product ordered' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Price of the product' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
