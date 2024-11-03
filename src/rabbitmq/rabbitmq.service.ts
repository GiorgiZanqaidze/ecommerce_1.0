import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { connect, Channel, Connection } from "amqplib";
import { CustomLoggerService } from "src/common";
import { LoggerContext } from "src/common/types/logger-context.enum";
import { MessageHandlerService } from "src/prisma/message-handler.service";
import { OrderMessageDto } from "./dto/order-message.dto";
import { MessageDto } from "./dto/message.dto";

@Injectable()
export class RabbitMQService implements OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;
  private readonly logger = new CustomLoggerService(RabbitMQService.name);
  private readonly queueName = "your_queue_name";

  constructor(private readonly messageHandler: MessageHandlerService) {
    this.initializeRabbitMQ();
  }

  async initializeRabbitMQ(retryCount = 0): Promise<void> {
    try {
      this.connection = await connect(process.env.RABBITMQ_URL);
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue(this.queueName, { durable: true });
      this.logger.log("RabbitMQ connected", LoggerContext.RABBIT);

      // Start consuming messages
      this.startConsumingMessages();

      // Listen for connection close and errors to handle reconnection
      this.connection.on("close", () => {
        this.logger.warn("RabbitMQ connection closed. Reconnecting...");
        this.retryConnection();
      });

      this.connection.on("error", error => {
        this.logger.error("RabbitMQ connection error", error.stack);
        this.retryConnection();
      });
    } catch (error) {
      this.logger.error("Failed to connect to RabbitMQ", error.stack);

      // Retry connection with exponential backoff
      const retryDelay = Math.min(5000 * 2 ** retryCount, 60000); // Cap delay at 1 minute
      this.logger.warn(`Retrying RabbitMQ connection in ${retryDelay / 1000}s...`);
      setTimeout(() => this.initializeRabbitMQ(retryCount + 1), retryDelay);
    }
  }

  async sendMessage<T>(message: MessageDto<T>) {
    try {
      // Validate message is an instance of OrderMessageDto
      if (!message) {
        throw new Error("Message must be a valid OrderMessageDto object");
      }

      // Convert the message to JSON string format
      const messageBuffer = Buffer.from(JSON.stringify(message));

      // Send the message to the queue
      this.channel.sendToQueue(this.queueName, messageBuffer, { persistent: true });
      this.logger.log(`Message sent: ${JSON.stringify(message)}`, LoggerContext.RABBIT);
    } catch (error) {
      this.logger.error("Error sending message", error.message);
    }
  }

  private async handleMessage(msg: any) {
    const messageContent = msg.content.toString();
    this.channel.ack(msg); // Acknowledge the message
    this.logger.log(`Message received and acknowledged: ${messageContent}`, LoggerContext.RABBIT);

    try {
      // Attempt to parse the message as JSON
      const parsedMessage = JSON.parse(messageContent);
      // Process the received message using the MessageHandlerService
      await this.messageHandler.processOrderMessage(parsedMessage);
    } catch (error) {
      this.logger.error(`Error processing message: ${messageContent}`, error);
    }
  }

  private retryConnection(): void {
    this.initializeRabbitMQ();
  }

  private startConsumingMessages() {
    this.channel.consume(
      this.queueName,
      msg => {
        if (msg) {
          this.handleMessage(msg);
        }
      },
      { noAck: false },
    );
  }

  // Close the connection when the module is destroyed
  async onModuleDestroy() {
    await this.connection?.close();
    this.logger.log("RabbitMQ connection closed on module destroy", LoggerContext.RABBIT);
  }
}
