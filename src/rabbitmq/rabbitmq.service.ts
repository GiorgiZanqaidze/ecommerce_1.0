import { Injectable } from '@nestjs/common';
import { connect, Channel, Connection } from 'amqplib'; // Make sure to install amqplib
import { CustomLoggerService } from 'src/common';
import { LoggerContext } from 'src/common/types/logger-context.enum';

@Injectable()
export class RabbitMQService {
  private connection: Connection;
  private channel: Channel;
  private readonly logger = new CustomLoggerService(RabbitMQService.name); // Create a logger for this service

  constructor() {
    this.initializeRabbitMQ();
  }

  async initializeRabbitMQ() {
    try {
      this.connection = await connect(process.env.RABBITMQ_URL); // Define this in your .env
      this.channel = await this.connection.createChannel();
      await this.channel.assertQueue('your_queue_name', { durable: true }); // Create a queue
      this.logger.log('RabbitMQ connected', LoggerContext.RABBIT); // Use custom logger
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error.stack); // Use custom logger
    }
  }

  async sendMessage(message: string) {
    try {
      if (!message || typeof message !== 'string') {
        throw new Error('Message must be a non-empty string');
      }
      this.channel.sendToQueue('your_queue_name', Buffer.from(message), {
        persistent: true,
      });
      this.logger.log(`Message sent: ${message}`, LoggerContext.RABBIT); // Use custom logger
    } catch (error) {
      this.logger.error('Error sending message:', error.message); // Use custom logger
    }
  }
}
