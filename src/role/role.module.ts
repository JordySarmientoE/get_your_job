import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { roleProviders } from './providers/user.provider';

@Module({
  providers: [...roleProviders,
    RoleService],
  controllers: [RoleController],
  exports: [RoleService]
})
export class RoleModule {}
