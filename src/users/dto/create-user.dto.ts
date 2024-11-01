// src/user/dto/create-user.dto.ts
import { IsString, IsEmail, IsBoolean, IsOptional, IsArray, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "The first name of the user" })
  @IsString()
  firstName: string;

  @ApiProperty({ description: "The last name of the user", required: false })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ description: "Indicates whether the user is active", required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ description: "The password for the user" })
  @IsString()
  password: string;

  @ApiProperty({ description: "The email address of the user" })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "The roles assigned to the user",
    type: [Number],
  })
  @IsArray()
  @IsNumber()
  @IsOptional()
  roles?: number[];
}
