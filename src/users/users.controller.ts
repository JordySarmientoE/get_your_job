import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../auth/models/roles.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';
import { IUserExpress } from 'src/common/common.interfaces';

@Controller('users')
@ApiTags('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard)
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

    @Roles(Role.ADMIN)
    @Get(':id')
    @ApiOperation({ summary: 'List user' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return {
            msg: 'List user',
            data: await this.userService.findOne(id)
        }
    }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    async create(@Body() payload: CreateUserDTO) {
        return {
            msg: 'Create user',
            data: await this.userService.create(payload)
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

    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        await this.userService.delete(id)
        return {
            msg: 'Delete user'
        }
    }
}
