import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductDto } from "./dto/product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("products")
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new product" })
  @ApiResponse({
    status: 201,
    description: "The product has been successfully created.",
    type: ProductDto, // Use ProductDto for the created product response
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, invalid data provided.",
  })
  async create(@Body() createProductDto: ProductDto): Promise<ProductDto> {
    const product = await this.productsService.create(createProductDto);
    return product; // Ensure the service returns a ProductDto
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all products" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved all products",
    type: [ProductDto], // Use ProductDto for the list of products
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  async findAll(): Promise<ProductDto[]> {
    const products = await this.productsService.findAll();
    return products; // Ensure the service returns an array of ProductDto
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a single product by ID" })
  @ApiResponse({
    status: 200,
    description: "Successfully retrieved the product",
    type: ProductDto, // Use ProductDto for the single product response
  })
  @ApiResponse({
    status: 404,
    description: "Product not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  async findOne(@Param("id") id: string): Promise<ProductDto> {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return product; // Ensure the service returns a ProductDto
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a product by ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully updated",
    type: ProductDto, // Use ProductDto for the updated product response
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, invalid data provided.",
  })
  @ApiResponse({
    status: 404,
    description: "Product not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  async update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto): Promise<ProductDto> {
    const product = await this.productsService.update(+id, updateProductDto);
    if (!product) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
    return product; // Ensure the service returns a ProductDto
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a product by ID" })
  @ApiResponse({
    status: 200,
    description: "The product has been successfully deleted",
  })
  @ApiResponse({
    status: 404,
    description: "Product not found",
  })
  @ApiResponse({
    status: 500,
    description: "Internal server error",
  })
  async remove(@Param("id") id: string): Promise<void> {
    const result = await this.productsService.remove(+id);
    if (!result) {
      throw new HttpException("Product not found", HttpStatus.NOT_FOUND);
    }
  }
}
