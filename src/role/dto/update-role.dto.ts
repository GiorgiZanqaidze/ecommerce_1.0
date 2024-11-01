// src/role/dto/update-role.dto.ts
import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateRoleDto {
  @ApiProperty({ description: "The name of the role", required: false })
  @IsString()
  @IsOptional()
  name?: string;
}
