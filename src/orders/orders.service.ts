import { Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // Create an order
  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, totalPrice, orderItems } = createOrderDto;

    return this.prisma.order.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          create: orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  // Get a single order by ID
  async getOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true,
        user: true,
      },
    });
  }

  // Get all orders for a specific user by userId
  async getOrdersByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId: +userId },
      include: {
        orderItems: true,
      },
    });
  }

  // Update an order by ID
  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const { totalPrice, orderItems } = updateOrderDto;

    // If orderItems is provided, update them
    if (orderItems) {
      await this.prisma.orderItem.deleteMany({ where: { orderId: id } });

      await this.prisma.orderItem.createMany({
        data: orderItems.map(item => ({
          orderId: id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    }

    // Update the order
    return this.prisma.order.update({
      where: { id },
      data: { totalPrice },
      include: { orderItems: true },
    });
  }

  // Cancel (delete) an order by ID
  async cancelOrder(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
