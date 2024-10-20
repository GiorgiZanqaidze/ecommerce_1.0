import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the path as necessary

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService], 
})
export class CategoryModule {}
