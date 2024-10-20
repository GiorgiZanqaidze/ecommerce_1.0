import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get(':id')
  getOrder(@Param('id') id: number) {
    return this.ordersService.getOrderById(id);
  }

  @Get('user/:userId')
  getOrdersByUser(@Param('userId') userId: number) {
    return this.ordersService.getOrdersByUserId(userId);
  }

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  cancelOrder(@Param('id') id: number) {
    return this.ordersService.cancelOrder(id);
  }
}
