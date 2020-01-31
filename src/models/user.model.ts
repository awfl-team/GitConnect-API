import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class User extends Document {
    static adminRole = 'ADMIN'
    static userRole = 'USER'

    @ApiProperty()
    id?: string

    @IsNotEmpty()
    @ApiProperty()
    username?: string

    @IsNotEmpty()
    @ApiProperty()
    password?: string

    @ApiProperty({ enum: [User.adminRole, User.userRole] })
    role?: string

    @IsEmail()
    @ApiProperty()
    email?: string
}
