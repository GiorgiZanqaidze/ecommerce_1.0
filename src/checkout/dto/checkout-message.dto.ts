import { IsArray, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

class CheckoutItemDto {
  @ApiProperty({ description: "The ID of the product.", example: "product_1" })
  @IsString()
  productId: string;

  @ApiProperty({ description: "The quantity of the product.", example: 2 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: "The price of the product.", example: 19.99 })
  @IsNumber()
  price: number;
}

export class CheckoutMessageDto {
  @ApiProperty({ description: "The ID of the user making the checkout.", example: "user_123456" })
  @IsString()
  userId: string;

  @ApiProperty({
    description: "List of items in the checkout.",
    type: [CheckoutItemDto],
    example: [
      { productId: "1", quantity: 2, price: 19.99 },
      { productId: "2", quantity: 1, price: 39.99 },
    ],
  })
  @IsArray()
  items: CheckoutItemDto[];

  @ApiProperty({ description: "The shipping address for the order.", example: "123 Main St, Springfield, USA" })
  @IsString()
  shippingAddress: string;

  @ApiProperty({ description: "The payment method chosen by the user.", example: "Credit Card" })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ description: "The total amount for the checkout.", example: 79.97 })
  @IsNumber()
  totalAmount: number;
}
