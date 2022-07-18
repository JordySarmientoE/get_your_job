import { Inject, Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { ICommon } from 'src/common/common.interfaces';
import { Repository } from 'typeorm';
import { UpdateUserProfileDTO, CreateUserProfileDTO } from '../dto/user_profile.dto';
import { UserProfile } from '../entities/user_profile.entity';

@Injectable()
export class UserProfileService {

  constructor(@Inject(ICommon.USER_PROFILE_REPOSITORY) private userProfileRepository: Repository<UserProfile>){}
  
  async create(payload: CreateUserProfileDTO = new CreateUserProfileDTO()) {
    try{
      const info = this.userProfileRepository.create(payload);
      return await this.userProfileRepository.save(info);
    }
    catch(error){
      throw new InternalServerErrorException();
    }
  }

  async update(payload: UpdateUserProfileDTO, id: number) {
    try{
      const user = await this.findOneByIdUser(id);
      if (!user) throw new BadRequestException('User has no profile')
      this.userProfileRepository.merge(user, payload);
      return await this.userProfileRepository.save(user);
    }
    catch(error){
      if (error.status) throw error;
      throw new InternalServerErrorException();
    }
  }

  async findOneByIdUser(id: number){
    try{
      return await this.userProfileRepository.findOne({
        where: {
          user: {
            id
          }
        },
        relations: ['user', 'user.role', 'user.user_info']
      })
    }
    catch(error){
      throw new InternalServerErrorException();
    }
  }
}
