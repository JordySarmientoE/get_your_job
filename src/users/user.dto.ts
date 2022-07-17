import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsPositive, IsOptional, MinLength, IsNumber } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({description: 'User email'})
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({description: 'User password'})
    readonly password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
}