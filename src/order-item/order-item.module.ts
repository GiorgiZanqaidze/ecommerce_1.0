// src/app.module.ts

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';

@Module({
    imports: [PrismaModule],
    controllers: [OrderItemController],
    providers: [OrderItemService]
  })
export class OrderItemModule {}
