import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
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
