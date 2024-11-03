import { Module } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import { CheckoutController } from "./checkout.controller";
import { ProductsModule } from "src/products/products.module";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";
import { RabbitMQModule } from "src/rabbitmq/rabbitmq.module";
import { ProductsService } from "src/products/products.service";

@Module({
  imports: [ProductsModule, RabbitMQModule],
  providers: [CheckoutService],
  controllers: [CheckoutController],
})
export class CheckoutModule {}
