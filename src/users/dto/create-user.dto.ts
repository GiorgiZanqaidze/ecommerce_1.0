export class CreateUserDto {
  firstName: string;
  lastName: string;
  isActive?: boolean;
  password: string;
  email: string;
  roles: string
}
