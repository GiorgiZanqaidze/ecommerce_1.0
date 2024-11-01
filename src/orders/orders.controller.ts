import { Controller, Get, Post, Param, Body, Put, Delete } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("orders") // Tags this controller in Swagger
@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({ status: 201, description: "The order has been successfully created." })
  @ApiResponse({ status: 400, description: "Invalid input." })
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: "Get order by ID" })
  @ApiResponse({ status: 200, description: "Order found." })
  @ApiResponse({ status: 404, description: "Order not found." })
  @Get(":id")
  getOrder(@Param("id") id: string) {
    // id is received as string from route parameters
    return this.ordersService.getOrderById(+id); // Convert id to number using + operator
  }

  @ApiOperation({ summary: "Get all orders for a user" })
  @ApiResponse({ status: 200, description: "Orders found." })
  @ApiResponse({ status: 404, description: "Orders not found." })
  @Get("user/:userId")
  getOrdersByUser(@Param("userId") userId: string) {
    // userId is received as string from route parameters
    return this.ordersService.getOrdersByUserId(+userId); // Convert userId to number using + operator
  }

  @ApiOperation({ summary: "Update an order" })
  @ApiResponse({ status: 200, description: "The order has been successfully updated." })
  @ApiResponse({ status: 404, description: "Order not found." })
  @Put(":id")
  updateOrder(@Param("id") id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(+id, updateOrderDto); // Convert id to number using + operator
  }

  @ApiOperation({ summary: "Cancel an order" })
  @ApiResponse({ status: 200, description: "The order has been successfully cancelled." })
  @ApiResponse({ status: 404, description: "Order not found." })
  @Delete(":id")
  cancelOrder(@Param("id") id: string) {
    return this.ordersService.cancelOrder(+id); // Convert id to number using + operator
  }
}
