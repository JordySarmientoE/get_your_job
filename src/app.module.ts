import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import config from './config';
import configSchema from './configSchema';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
    load: [config],
    validationSchema: configSchema
  }), UsersModule, AuthModule, RoleModule]
})
export class AppModule {}
