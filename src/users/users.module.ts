import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { userProviders } from './user.provider';

@Module({
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
