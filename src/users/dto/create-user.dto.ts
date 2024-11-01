import { IsString, IsEmail, IsBoolean, IsOptional } from "class-validator";

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  roles: string;
}
