import { Controller, Delete, Get, Param, Post, Put, UseGuards, ParseIntPipe, Body } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateRoleDTO, UpdateRoleDTO } from '../dto/role.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';
import { RolesGuard } from '../../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('roles')
@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @Roles(Role.ADMIN)
    @Get()
    @ApiOperation({ summary: 'List roles' })
    async findAll() {
        return {
            msg: 'List roles',
            data: await this.roleService.findAll()
        }
    }

    @Roles(Role.ADMIN)
    @Get(':id')
    @ApiOperation({ summary: 'List role' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List roles',
            data: await this.roleService.findOne(id)
        }
    }

    @Roles(Role.ADMIN)
    @Post()
    @ApiOperation({ summary: 'Create role' })
    async create(@Body() payload: CreateRoleDTO) {
        return {
            msg: 'Create roles',
            data: await this.roleService.create(payload)
        }
    }

    @Roles(Role.ADMIN)
    @Put(':id')
    @ApiOperation({ summary: 'Update role' })
    async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateRoleDTO) {
        return {
            msg: 'Update roles',
            data: await this.roleService.update(id, payload)
        }
    }

    @Roles(Role.ADMIN)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete role' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        await this.roleService.delete(id)
        return {
            msg: 'Delete role'
        }
    }
}
