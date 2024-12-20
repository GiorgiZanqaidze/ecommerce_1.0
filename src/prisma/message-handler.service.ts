import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CustomLoggerService } from "src/common";
import { LoggerContext } from "src/common/types/logger-context.enum";
import { OrderMessageDto } from "src/rabbitmq/dto/order-message.dto";

@Injectable()
export class MessageHandlerService {
  private readonly logger = new CustomLoggerService(MessageHandlerService.name);

  constructor(private readonly prisma: PrismaService) {}

  async processOrderMessage(orderMessage: OrderMessageDto) {
    // Check if orderMessage and orderMessage.data are defined
    if (!orderMessage || !orderMessage.data || !orderMessage.data.orderId) {
      this.logger.error("Received invalid order message structure.");
      return; // Exit early if message is not valid
    }
    const { orderId, status, totalPrice, userId } = orderMessage.data;

    try {
      // Update the order status in the database
      const updatedOrder = await this.prisma.order.create({
        data: {
          status,
          totalPrice,
          updatedAt: new Date(), // Update timestamp
          user: {
            connect: { id: parseInt(userId) }, // Assuming `id` is the primary key for the user
          },
        },
      });

      this.logger.log(`Order updated successfully: ${JSON.stringify(updatedOrder)}`, LoggerContext.RABBIT);

      // Additional logic like notifying users or updating inventory can go here
    } catch (error) {
      this.logger.error(`Failed to process order message: ${error.message}`);
      throw new Error(error.message);
    }
  }
}
