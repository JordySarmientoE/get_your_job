import { BadGatewayException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICommon } from '../common/common.interfaces';
import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';
import { RoleService } from '../role/role.service';
import { RolesEnum } from '../role/role.interfaces';

@Injectable()
export class UsersService {
    constructor(@Inject(ICommon.PHOTO_REPOSITORY) private userRepository: Repository<User>, private roleService: RoleService) { }

    async findAll() {
        try {
            return this.userRepository.find({
                relations: ['role']
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
                }
            })
            if (!user) throw new NotFoundException('User not found');
            return user
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async create(payload: CreateUserDTO, role: RolesEnum) {
        try {
            if (await this.findByEmail(payload.email)) {
                throw new BadGatewayException(`Email ${payload.email} has been taken`);
            }
            const newUser = this.userRepository.create(payload);
            newUser.role = await this.roleService.findOne(role);
            const hashPassword = await bcrypt.hash(newUser.password, 10);
            newUser.password = hashPassword;
            return await this.userRepository.save(newUser)
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
