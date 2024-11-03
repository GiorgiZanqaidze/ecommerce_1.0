import { IsString, IsNotEmpty, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class MessageDto<T> {
  @ApiProperty({
    description: "Type of the message, e.g., 'order', 'notification'",
    example: "order",
  })
  @IsString()
  @IsNotEmpty()
  messageType: string;

  @ApiProperty({
    description: "Message data payload with a flexible structure",
    example: { orderId: "1", status: "pending", totalPrice: 2000 },
  })
  @ValidateNested()
  @Type(() => Object)
  data: T;
}
