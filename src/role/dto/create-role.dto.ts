// src/role/dto/create-role.dto.ts
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ description: "The name of the role" })
  @IsString()
  name: string;
}
