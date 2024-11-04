import { Module } from "@nestjs/common";
import { RabbitMQService } from "./rabbitmq.service";
import { RabbitMQController } from "./rabbitmq.controller";
import { RabbitMQModule as GolevelupRabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { MessageHandlerService } from "src/prisma/message-handler.service";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [
    GolevelupRabbitMQModule.forRoot(GolevelupRabbitMQModule, {
      uri: process.env.RABBITMQ_URL,
      exchanges: [
        {
          name: "your_exchange",
          type: "topic", // or 'direct', 'fanout', etc.
        },
      ],
      connectionInitOptions: {
        timeout: 10000, // Increase timeout to 10 seconds
      },
    }),
    PrismaModule,
  ],
  providers: [RabbitMQService, MessageHandlerService],
  controllers: [RabbitMQController],
  exports: [RabbitMQService], // Export the service if needed elsewhere
})
export class RabbitMQModule {}
