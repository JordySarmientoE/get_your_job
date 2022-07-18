import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from 'class-validator';

export class CreateUserInfoDTO {
    @IsString()
    @ApiProperty({description: 'User info name'})
    readonly name: string;
    @IsString()
    @ApiProperty({description: 'User info lastname'})
    readonly lastname: string;
    @IsString()
    @ApiProperty({description: 'User info dni'})
    readonly dni: string;
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'User info civil_status'})
    readonly civil_status: string;
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'User info genre'})
    readonly genre: string;
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'User info birthday'})
    readonly birthday: Date;
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'User info phone'})
    readonly phone: string;
    @IsString()
    @IsOptional()
    @ApiProperty({description: 'User info address'})
    readonly address: string;
    @IsString()
    @ApiProperty({description: 'User info nacionalty'})
    readonly nacionalty: string;
}

export class UpdateUserInfoDTO extends PartialType(CreateUserInfoDTO) {
}
