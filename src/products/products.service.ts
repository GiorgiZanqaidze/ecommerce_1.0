import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Product } from "@prisma/client";
import { CustomLoggerService } from "src/common";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  logger = new CustomLoggerService(ProductsService.name);

  async create(createProductDto: ProductDto) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }

      return product;
    } catch (error) {
      // Handle Prisma errors or other unexpected errors
      this.logger.error(error);
      throw new InternalServerErrorException("An error occurred while retrieving the product.");
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
