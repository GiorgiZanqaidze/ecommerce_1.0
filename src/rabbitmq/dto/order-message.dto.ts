import { IsString, IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MessageDto } from "./message.dto";

export class OrderMessageData {
  @ApiProperty({
    description: "Unique ID of the order in readable format (e.g., 'ORD-2024-abc12345')",
    example: "ORD-2024-f47ac10b",
  })
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({
    description: "Unique ID of the user associated with the order",
    example: "user-12345",
  })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: "Current status of the order",
    example: "pending",
    enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: "Total price of the order in cents",
    example: 2000,
  })
  @IsNumber()
  totalPrice: number;
}

export class OrderMessageDto extends MessageDto<OrderMessageData> {}
