import { PartialType, ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserInfoDTO } from './user_info.dto';

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'User email' })
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({ description: 'User password' })
    readonly password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
}

export class CreateUserAndInfoDTO extends IntersectionType(CreateUserDTO, CreateUserInfoDTO){}