import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { connect, Channel, Connection } from "amqplib";
import { CustomLoggerService } from "src/common";
import { LoggerContext } from "src/common/types/logger-context.enum";
import { MessageHandlerService } from "src/prisma/message-handler.service";
import { OrderMessageDto } from "./dto/order-message.dto";

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

  async sendMessage(message: OrderMessageDto) {
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

  async receiveMessage(timeout: number = 5000): Promise<string | null> {
    return new Promise((resolve, reject) => {
      let timer: NodeJS.Timeout;

      this.logger.log("Attempting to consume messages from the queue", LoggerContext.RABBIT);

      // Function to handle received messages
      const consumeMessage = (msg: any) => {
        if (msg) {
          const messageContent = msg.content.toString();
          this.channel.ack(msg); // Acknowledge the message
          clearTimeout(timer); // Clear the timeout if a message is received
          this.logger.log(`Message received and acknowledged: ${messageContent}`, LoggerContext.RABBIT);

          try {
            // Attempt to parse the message as JSON
            const parsedMessage = JSON.parse(messageContent);
            // Process the received message using the MessageHandlerService
            this.messageHandler.processOrderMessage(parsedMessage);
            resolve(messageContent); // Resolve with the message content if JSON
          } catch (error) {
            // Handle non-JSON messages or log an error if JSON parsing fails
            this.logger.error(`Received a non-JSON message: ${messageContent}`);
            resolve(null); // Optionally resolve null or handle the message differently
          }
        }
      };

      // Start consuming messages from the queue
      this.channel.consume(this.queueName, consumeMessage, { noAck: false });

      // Set a timeout to resolve with null if no message is received in the specified time
      timer = setTimeout(() => {
        this.logger.log("Timeout reached, no messages in the queue", LoggerContext.RABBIT);
        this.channel.cancel(this.queueName); // Cancel the consumer to stop listening
        resolve(null); // Resolve null if the timeout is reached
      }, timeout);
    });
  }

  private retryConnection(): void {
    this.initializeRabbitMQ();
  }

  // Close the connection when the module is destroyed
  async onModuleDestroy() {
    await this.connection?.close();
    this.logger.log("RabbitMQ connection closed on module destroy", LoggerContext.RABBIT);
  }
}
