// src/order/order.service.ts

import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(data: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        userId: data.userId,
        totalPrice: data.totalPrice,
        orderItems: {
          create: data.orderItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: { orderItems: true },
    });
  }

  async getOrders() {
    return this.prisma.order.findMany({
      include: { orderItems: true },
    });
  }

  async getOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true },
    });
  }
}
