import { Controller, Get, Post, Body, Param, Patch, Delete } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "@prisma/client";
import { ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";

@ApiTags("categories")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: "Create a new category" })
  @ApiResponse({ status: 201, description: "The category has been successfully created." })
  @ApiResponse({ status: 400, description: "Invalid data provided." })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: "Retrieve all categories" })
  @ApiResponse({ status: 200, description: "All categories retrieved successfully." })
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Retrieve a category by ID" })
  @ApiResponse({ status: 200, description: "The category has been found." })
  @ApiResponse({ status: 404, description: "Category not found." })
  findOne(@Param("id") id: string): Promise<Category | null> {
    return this.categoryService.findOne(+id); // Convert to number using +
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a category" })
  @ApiResponse({ status: 200, description: "The category has been successfully updated." })
  @ApiResponse({ status: 404, description: "Category not found." })
  update(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.categoryService.update(+id, updateCategoryDto); // Convert to number using +
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a category" })
  @ApiResponse({ status: 200, description: "The category has been successfully deleted." })
  @ApiResponse({ status: 404, description: "Category not found." })
  remove(@Param("id") id: string): Promise<Category> {
    return this.categoryService.remove(+id); // Convert to number using +
  }
}
