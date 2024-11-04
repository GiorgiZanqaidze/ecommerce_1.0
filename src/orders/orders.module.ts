import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

@Module({
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: "ORDERS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://localhost:5672"], // Adjust as necessary
          queue: "orders_queue",
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
