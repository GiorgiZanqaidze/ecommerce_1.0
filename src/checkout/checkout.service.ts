import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { RabbitMQService } from "src/rabbitmq/rabbitmq.service";
import { CheckoutMessageDto } from "./dto/checkout-message.dto";
import { OrderMessageData } from "src/rabbitmq/dto/order-message.dto";
import { ProductsService } from "../products/products.service"; // Import ProductsService
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CheckoutService {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly productsService: ProductsService,
  ) {}

  async checkout(checkoutData: CheckoutMessageDto) {
    // Validate the checkout data
    this.validateCheckoutData(checkoutData);

    // Check inventory for the items in the checkout
    const inventoryAvailable = await this.checkInventory(checkoutData.items);
    if (!inventoryAvailable) {
      throw new BadRequestException("One or more items are out of stock.");
    }

    // Calculate the total price
    const totalPrice = this.calculateTotalPrice(checkoutData.items);

    // Or use a custom readable format if preferred
    const orderIdReadable = `ORD-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`;

    // Publish a message to RabbitMQ
    this.rabbitMQService.sendMessage<OrderMessageData>({
      messageType: "check-out",
      data: {
        orderId: orderIdReadable,
        status: "pending",
        totalPrice,
        userId: checkoutData.userId,
      },
    });

    return { message: "Checkout process initiated.", totalPrice };
  }

  private async checkInventory(items: any[]): Promise<boolean> {
    // Check the stock for each item using ProductsService
    for (const item of items) {
      const product = await this.productsService.findOne(item.productId); // Assuming `productId` is in the checkoutData
      if (!product || product.stockQuantity < item.quantity) {
        return false; // Not enough stock available
      }
    }
    return true; // All items are in stock
  }

  private validateCheckoutData(checkoutData: CheckoutMessageDto) {
    if (!checkoutData || !checkoutData.items || checkoutData.items.length === 0) {
      throw new BadRequestException("Checkout data must include items.");
    }
  }

  private calculateTotalPrice(items: { productId: string; price: number; quantity: number }[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
