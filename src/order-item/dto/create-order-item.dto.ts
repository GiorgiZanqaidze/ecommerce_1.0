// src/order-item/dto/create-order-item.dto.ts

import { IsInt, IsNotEmpty, IsPositive, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderItemDto {
  @ApiProperty({ description: "The ID of the order" })
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @ApiProperty({ description: "The ID of the product" })
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @ApiProperty({ description: "The quantity of the product", minimum: 1 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: "The price of the product", minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
