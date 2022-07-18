import { Inject, Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICommon } from '../../common/common.interfaces';
import { UpdateUserDTO, CreateUserAndInfoDTO } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../../role/services/role.service';
import { RolesEnum } from '../../role/interfaces/role.interfaces';
import { UserInfoService } from './user_info.service';
import { UserProfileService } from './user_profile.service';
import { UserProfile } from '../entities/user_profile.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@Inject(ICommon.PHOTO_REPOSITORY) private userRepository: Repository<User>, private roleService: RoleService,
        private userInfoService: UserInfoService, private userProfileService: UserProfileService) { }

    async findAll() {
        try {
            return this.userRepository.find({
                relations: ['role', 'user_info']
            });
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id
                },
                relations: [
                    'role', 'user_info', 'user_profile'
                ]
            })
            if (!user) throw new NotFoundException('User not found');
            return user
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async create(payload: CreateUserAndInfoDTO, role: RolesEnum) {
        try {
            if (await this.findByEmail(payload.email)) {
                throw new BadRequestException(`Email ${payload.email} has been taken`);
            }
            const newUser = this.userRepository.create(payload);
            newUser.role = await this.roleService.findOne(role);
            const hashPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashPassword;
            const user_info = await this.userInfoService.create(payload);
            let user_profile: UserProfile;
            if (role === RolesEnum.PROFESSIONAL) {
                user_profile = await this.userProfileService.create();
            }
            const dataSaved = await this.userRepository.save({
                ...newUser,
                user_info,
                user_profile
            })
            delete dataSaved.password;
            return dataSaved
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async findByEmail(email: string) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    email
                },
                relations: ['role']
            });
            return user;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async update(payload: UpdateUserDTO, id: number) {
        try {
            const user = await this.findOne(id);
            this.userRepository.merge(user, payload);
            return await this.userRepository.save(user)
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async delete(id: number) {
        try {
            await this.findOne(id)
            await this.userRepository.delete(id)
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }
}
