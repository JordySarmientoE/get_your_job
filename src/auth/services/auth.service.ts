import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from '../models/token.model';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService, private jwtService: JwtService) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return user;
        }
        return null;
    }

    generateJWT(user: User) {
        const payload: PayloadToken = { role: user.role, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }
}
