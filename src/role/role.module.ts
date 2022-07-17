import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from './user.provider';

@Module({
  providers: [...roleProviders,
    RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
