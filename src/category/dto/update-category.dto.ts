import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Home Appliances', // Example value for the update
    required: false, // Mark as optional
  })
  @IsString()
  @IsOptional()
  name?: string;
}
