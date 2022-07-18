import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UpdateUserInfoDTO, CreateUserInfoDTO } from '../dto/user_info.dto';
import { ICommon } from '../../common/common.interfaces';
import { Repository } from 'typeorm';
import { UserInfo } from '../entities/user_info.entity';

@Injectable()
export class UserInfoService {

  constructor(@Inject(ICommon.USER_INFO_REPOSITORY) private userInfoRepository: Repository<UserInfo>){}

  async create(payload: CreateUserInfoDTO = new CreateUserInfoDTO()) {
    try{
      const info = this.userInfoRepository.create(payload);
      return await this.userInfoRepository.save(info);
    }
    catch(error){
      throw new InternalServerErrorException();
    }
  }

  async findOneByIdUser(id: number){
    try{
      return await this.userInfoRepository.findOne({
        where: {
          user: {
            id
          }
        },
        relations: ['user', 'user.role', 'user.user_profile']
      })
    }
    catch(error){
      throw new InternalServerErrorException();
    }
  }

  async update(payload: UpdateUserInfoDTO, id: number) {
    try{
      const user = await this.findOneByIdUser(id);
      this.userInfoRepository.merge(user, payload);
      return await this.userInfoRepository.save(user);
    }
    catch(error){
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }
}
