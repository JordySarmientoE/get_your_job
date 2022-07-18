import { PartialType, ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from 'class-validator';

export class CreateUserProfileDTO {
    @IsString()
    @ApiProperty({ description: 'User profile job goal' })
    readonly job_goal: string;
    @IsNumber()
    @ApiProperty({ description: 'User profile salary preference' })
    readonly salary_preference: number;
}

export class UpdateUserProfileDTO extends PartialType(CreateUserProfileDTO) {
}