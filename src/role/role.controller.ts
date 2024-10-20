// src/role/role.controller.ts
import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('roles') // Swagger tag for grouping
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Role created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid data.' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Return all roles.' })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Return a specific role.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Role updated successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Role deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Role not found.' })
  delete(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
