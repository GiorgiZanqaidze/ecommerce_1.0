import { IsString, IsNumber, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { MessageDto } from "./message.dto";

export class OrderMessageData {
  @ApiProperty({ description: "Unique ID of the order", example: "1" })
  @IsString()
  @IsNotEmpty()
  orderId!: string;

  @ApiProperty({ description: "Status of the order", example: "pending" })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ description: "Total price of the order", example: 2000 })
  @IsNumber()
  totalPrice: number;
}

export class OrderMessageDto extends MessageDto<OrderMessageData> {}
