import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A description of the product',
    example: 'A high-performance laptop with 16GB RAM and 512GB SSD.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 999.99,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 50,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  stockQuantity?: number;
}
