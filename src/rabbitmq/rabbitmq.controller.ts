import { Controller, Post, Body, Get } from "@nestjs/common";
import { RabbitMQService } from "./rabbitmq.service";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { SendMessageDto } from "./dto/send-message.dto"; // Import the DTO

@ApiTags("rabbitmq") // Swagger tag for grouping
@Controller("rabbitmq")
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post("send")
  @ApiResponse({ status: 201, description: "Message sent successfully." })
  @ApiResponse({ status: 400, description: "Invalid message format." })
  async sendMessage(@Body() sendMessageDto: SendMessageDto) {
    // Use the DTO here
    await this.rabbitMQService.sendMessage(sendMessageDto.message);
    return { status: "Message sent!" };
  }

  @Get("status")
  @ApiResponse({ status: 200, description: "RabbitMQ Service is running!" })
  getStatus() {
    return "RabbitMQ Service is running!";
  }
}
