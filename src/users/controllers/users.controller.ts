import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { UpdateUserDTO, CreateUserAndInfoDTO } from '../dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Role } from '../../auth/models/roles.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';
import { IUserExpress } from 'src/common/common.interfaces';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { RolesEnum } from 'src/role/interfaces/role.interfaces';

@Controller('users')
@ApiTags('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get()
    @ApiOperation({ summary: 'List users' })
    async findAll() {
        return {
            msg: 'List users',
            data: await this.userService.findAll()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('info')
    @ApiOperation({ summary: 'User info' })
    async getInfo(@Req() req: Request) {
        const user = req.user as IUserExpress;
        const id = user.sub
        return {
            msg: 'List user',
            data: await this.userService.findOne(id)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Get(':id')
    @ApiOperation({ summary: 'List user' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List user',
            data: await this.userService.findOne(id)
        }
    }

    @Post('professional')
    @ApiOperation({ summary: 'Create user professional' })
    async createProfessional(@Body() payload: CreateUserAndInfoDTO) {
        return {
            msg: 'Create user professional',
            data: await this.userService.create(payload, RolesEnum.PROFESSIONAL)
        }
    }

    @Post('employer')
    @ApiOperation({ summary: 'Create user employer' })
    async createEmployer(@Body() payload: CreateUserAndInfoDTO) {
        return {
            msg: 'Create user employer',
            data: await this.userService.create(payload, RolesEnum.EMPLOYER)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('admin')
    @ApiOperation({ summary: 'Create user admin' })
    async createAdmin(@Body() payload: CreateUserAndInfoDTO) {
        return {
            msg: 'Create user admin',
            data: await this.userService.create(payload, RolesEnum.ADMIN)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    @ApiOperation({ summary: 'Update user' })
    async updateUser(@Body() payload: UpdateUserDTO, @Req() req: Request) {
        const user = req.user as IUserExpress;
        const id = user.sub
        return {
            msg: 'Update user',
            data: await this.userService.update(payload, id)
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this.userService.delete(id)
        return {
            msg: 'Delete user'
        }
    }
}
