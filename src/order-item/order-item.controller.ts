import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from '@prisma/client';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The order item has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid data provided.' })
  create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all order items.' })
  findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'The order item has been found.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  findOne(@Param('id') id: string): Promise<OrderItem | null> { // Change the type to string
    return this.orderItemService.findOne(+id); // Convert id to number using +
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The order item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  update(@Param('id') id: string, @Body() updateOrderItemDto: CreateOrderItemDto): Promise<OrderItem> { // Change the type to string
    return this.orderItemService.update(+id, updateOrderItemDto); // Convert id to number using +
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'The order item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order item not found.' })
  remove(@Param('id') id: string): Promise<OrderItem> { // Change the type to string
    return this.orderItemService.remove(+id); // Convert id to number using +
  }
}
