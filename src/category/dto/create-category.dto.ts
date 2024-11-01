import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({
    description: "The name of the category",
    example: "Electronics", // You can provide an example value
  })
  @IsString()
  name: string;
}
