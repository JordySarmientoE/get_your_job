import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Role name' })
    readonly name: string;
}

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {
}