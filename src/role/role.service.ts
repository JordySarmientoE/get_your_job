import { Inject, Injectable, InternalServerErrorException, NotFoundException, BadGatewayException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { ICommon } from '../common/common.interfaces';
import { CreateRoleDTO, UpdateRoleDTO } from './role.dto';

@Injectable()
export class RoleService {

    constructor(@Inject(ICommon.ROLE_REPOSITORY) private roleRepository: Repository<Role>){}

    async findAll(){
        try{
            return this.roleRepository.find();
        }
        catch(error){
            throw new InternalServerErrorException();
        }
    }

    async findOne(id: number){
        try{
            const role = await this.roleRepository.findOne({
                where: {
                    id
                }
            })
            if(!role) throw new NotFoundException('Role not found');
            return role
        }
        catch(error){
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async create(payload: CreateRoleDTO){
        try {
            if (await this.findByName(payload.name)) {
                throw new BadGatewayException(`Role ${payload.name} has been taken`);
            }
            const role = this.roleRepository.create(payload);
            return await this.roleRepository.save(role)
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async findByName(name: string){
        try{
            return await this.roleRepository.findOne({
                where: {
                    name
                }
            })
        }
        catch(error){
            throw new InternalServerErrorException();
        }
    }

    async update(id: number, payload: UpdateRoleDTO){
        try{
            const role = await this.findOne(id);
            this.roleRepository.merge(role, payload);
            return await this.roleRepository.save(role)
        }
        catch(error){
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }

    async delete(id: number) {
        try {
            await this.findOne(id)
            await this.roleRepository.delete(id)
        }
        catch (error) {
            if (error.status) throw error;
            throw new InternalServerErrorException();
        }
    }
}
