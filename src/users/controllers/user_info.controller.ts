import { Controller, Post, Body, Put, Req, UseGuards } from '@nestjs/common';
import { UserInfoService } from '../services/user_info.service';
import { CreateUserInfoDTO, UpdateUserInfoDTO } from '../dto/user_info.dto';
import { Request } from 'express';
import { IUserExpress } from 'src/common/common.interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('user-info')
@ApiTags('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) { }

  @Post()
  @ApiOperation({ summary: 'Create user info' })
  async create(@Body() payload: CreateUserInfoDTO) {
    return {
      msg: 'Create user info',
      data: await this.userInfoService.create(payload)
    }
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update User Info' })
  async update(@Body() payload: UpdateUserInfoDTO, @Req() req: Request) {
    const user = req.user as IUserExpress;
    const id = user.sub
    return {
      msg: 'Update user info',
      data: await this.userInfoService.update(payload, id)
    }
  }
}
