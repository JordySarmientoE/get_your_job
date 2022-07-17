import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './user.provider';
import { RoleModule } from '../role/role.module';

@Module({
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService],
  exports: [
    UsersService
  ],
  imports: [
    RoleModule
  ]
})
export class UsersModule { }
