import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { OrderService } from '../order/order.service';
  
  @WebSocketGateway({ namespace: '/', cors: { origin: '*' } })
  export class OrdersGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
  
    constructor(private readonly orderService: OrderService) {}
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('newOrder')
    async handleNewOrder() {
      const orders = await this.orderService.getOrders(); // Fetch or process as needed
      this.server.emit('ordersUpdate', orders); // Broadcast to all clients
    }
  }
  