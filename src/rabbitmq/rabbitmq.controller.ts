import { Controller, Post, Body, Get, BadRequestException } from "@nestjs/common";
import { RabbitMQService } from "./rabbitmq.service";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { CustomLoggerService } from "src/common";
import { LoggerContext } from "src/common/types/logger-context.enum";
import { OrderMessageDto } from "./dto/order-message.dto";

@ApiTags("rabbitmq") // Swagger tag for grouping
@Controller("rabbitmq")
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}
  private readonly logger = new CustomLoggerService(RabbitMQController.name);

  @Post("send")
  @ApiResponse({ status: 201, description: "Message sent successfully." })
  @ApiResponse({ status: 400, description: "Invalid message format." })
  async sendMessage(@Body() sendMessageDto: OrderMessageDto) {
    try {
      await this.rabbitMQService.sendMessage(sendMessageDto);
      return { status: "Message sent!" };
    } catch (error) {
      this.logger.error("Error sending message", error.message);
      throw new BadRequestException("Invalid message format."); // or appropriate error handling
    }
  }

  @Get("status")
  @ApiResponse({ status: 200, description: "RabbitMQ Service is running!" })
  getStatus() {
    return "RabbitMQ Service is running!";
  }

  @Get("receive")
  @ApiResponse({ status: 200, description: "Message received successfully." })
  async receiveMessageFromQueue() {
    this.logger.log("Receiving message from RabbitMQ", LoggerContext.RABBIT);
    const message = await this.rabbitMQService.receiveMessage();

    if (message) {
      this.logger.log("Message received successfully", LoggerContext.RABBIT);
      return { message };
    } else {
      this.logger.log("No messages in the queue", LoggerContext.RABBIT);
      return { message: "No messages in the queue." };
    }
  }
}
