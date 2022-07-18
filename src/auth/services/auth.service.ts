import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';
import { UsersService } from '../../users/services/users.service';
import { LoginDTO } from '../dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (!user) return null;
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return user;
        }
        return null;
    }

    async generateJWT(payload: LoginDTO) {
        const user = await this.userService.findByEmail(payload.email)
        const payloadToken: PayloadToken = { role: user.role.name, sub: user.id };
        return {
            access_token: this.jwtService.sign(payloadToken),
            user
        }
    }
}
