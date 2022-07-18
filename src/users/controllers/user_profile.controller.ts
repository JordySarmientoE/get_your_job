import { Controller, Post, Body, Put, Req, UseGuards } from '@nestjs/common';
import { UserProfileService } from '../services/user_profile.service';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from '../dto/user_profile.dto';
import { Request } from 'express';
import { IUserExpress } from 'src/common/common.interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user-profile')
@ApiTags('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @ApiOperation({ summary: 'Create profile info' })
  @Post()
  async create(@Body() payload: CreateUserProfileDTO) {
    return {
      msg: 'Create profile info',
      data: await this.userProfileService.create(payload)
    }
  }

  @ApiOperation({ summary: 'Update profile info' })
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Body() payload: UpdateUserProfileDTO, @Req() req: Request) {
    const user = req.user as IUserExpress;
    const id = user.sub
    return {
      msg: 'Update profile info',
      data: await this.userProfileService.update( payload, id)
    }
  }
}
