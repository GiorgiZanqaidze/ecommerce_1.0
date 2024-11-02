import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'The message to be sent to the RabbitMQ queue',
    example: 'Hello, RabbitMQ!', // Provide an example for better clarity
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
