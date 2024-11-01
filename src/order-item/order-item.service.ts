// src/order-item/order-item.service.ts

import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service"; // Adjust the import based on your directory structure
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { OrderItem } from "@prisma/client";

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new order item
  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.prisma.orderItem.create({
      data: createOrderItemDto,
    });
  }

  // Find all order items
  async findAll(): Promise<OrderItem[]> {
    return this.prisma.orderItem.findMany();
  }

  // Find one order item by ID
  async findOne(id: number): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });
    if (!orderItem) {
      throw new NotFoundException(`Order item with ID ${id} not found`);
    }
    return orderItem;
  }

  // Update an order item by ID
  async update(id: number, updateOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.findOne(id); // Check if order item exists
    return this.prisma.orderItem.update({
      where: { id: orderItem.id },
      data: updateOrderItemDto,
    });
  }

  // Delete an order item by ID
  async remove(id: number): Promise<OrderItem> {
    const orderItem = await this.findOne(id); // Check if order item exists
    return this.prisma.orderItem.delete({
      where: { id: orderItem.id },
    });
  }
}
