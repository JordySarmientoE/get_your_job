import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Email' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Password' })
    readonly password: string;
}