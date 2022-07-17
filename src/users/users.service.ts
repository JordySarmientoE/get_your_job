import { BadGatewayException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ICommon } from '../common/common.interfaces';
import { User } from './user.entity';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@Inject(ICommon.PHOTO_REPOSITORY) private userRepository: Repository<User>) { }

    async findAll(): Promise<User[]> {
        try {
            return this.userRepository.find();
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number): Promise<User> {
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

    async create(payload: CreateUserDTO): Promise<User> {
        try {
            if (await this.findByEmail(payload.email)) {
                throw new BadGatewayException(`Email ${payload.email} has been taken`);
            }
            const newUser = this.userRepository.create(payload);
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
                }
            });
            return user;
        }
        catch (error) {
            throw new InternalServerErrorException();
        }
    }

    async update(payload: UpdateUserDTO, id: number) {
        const user = await this.findOne(id);
        this.userRepository.merge(user, payload);
        return await this.userRepository.save(user)
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
