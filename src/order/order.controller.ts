import { Controller, Get, Post, Body, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@ApiTags("Orders")
@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: "Create a new order" })
  @ApiResponse({ status: 201, description: "The order has been created successfully." })
  @ApiResponse({ status: 400, description: "Invalid order data." })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all orders" })
  @ApiResponse({ status: 200, description: "List of orders." })
  async getOrders() {
    return this.orderService.getOrders();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a specific order by ID" })
  @ApiResponse({ status: 200, description: "Order data." })
  @ApiResponse({ status: 404, description: "Order not found." })
  async getOrderById(@Param("id", ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }
}
