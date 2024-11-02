import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
import { RabbitMQModule as GolevelupRabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    GolevelupRabbitMQModule.forRoot(GolevelupRabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      exchanges: [
        {
          name: 'your_exchange',
          type: 'topic', // or 'direct', 'fanout', etc.
        },
      ],
    }),
  ],
  providers: [RabbitMQService],
  controllers: [RabbitMQController],
  exports: [RabbitMQService], // Export the service if needed elsewhere
})
export class RabbitMQModule {}
