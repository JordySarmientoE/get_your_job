import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from '../dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @ApiOperation({ summary: 'Login' })
    @Post()
    async login(@Body() payload: LoginDTO) {
        return await this.authService.generateJWT(payload);
    }
}
