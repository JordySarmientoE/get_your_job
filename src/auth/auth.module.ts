import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UsersModule, PassportModule, JwtModule.registerAsync({
        inject: [config.KEY],
        useFactory: (configService: ConfigType<typeof config>) => {
          return {
            secret: configService.jwt_key,
            signOptions: {
              expiresIn: '7d'
            },
          };
        }
      })],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      controllers: [AuthController]
})
export class AuthModule { }
