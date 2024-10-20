// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        roles: createUserDto.roles ? {
          connect: createUserDto.roles.map(role => ({ id: role })),
        } : undefined,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Handle roles update
    const rolesData = updateUserDto.roles ? {
      set: updateUserDto.roles.map(role => ({
        id: Number(role), // Assuming roles are identified by their IDs
      })),
    } : undefined; // Only set roles if they are provided

    return this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        ...(rolesData && { roles: rolesData }), // Only include roles if defined
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
