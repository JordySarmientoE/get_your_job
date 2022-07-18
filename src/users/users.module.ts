import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { userProviders } from './providers/user.provider';
import { RoleModule } from '../role/role.module';
import { UserProfileController } from './controllers/user_profile.controller';
import { UserInfoController } from './controllers/user_info.controller';
import { userInfoProviders } from './providers/user_info.provider';
import { userProfileProviders } from './providers/user_profile.provider';
import { UserInfoService } from './services/user_info.service';
import { UserProfileService } from './services/user_profile.service';

@Module({
  controllers: [UsersController, UserProfileController, UserInfoController],
  providers: [
    ...userProviders,
    ...userInfoProviders,
    ...userProfileProviders,
    UsersService,
    UserInfoService,
    UserProfileService],
  exports: [
    UsersService
  ],
  imports: [
    RoleModule
  ]
})
export class UsersModule { }
