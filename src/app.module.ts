import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemController } from './order-item/order-item.controller';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItemService } from './order-item/order-item.service';
import { CategoryModule } from './category/category.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
  AuthModule,
  UsersModule,
  ProductsModule,
  PrismaModule,
  ConfigModule.forRoot({
    isGlobal: true, // Makes the module global
    envFilePath: '.env', // Specify the path to the .env file
  }),
  OrdersModule,
  OrderItemModule,
  CategoryModule,
  RoleModule,
  ],
  controllers: [AppController, OrderItemController],
  providers: [AppService, OrderItemService],
})
export class AppModule {}
