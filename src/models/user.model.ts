import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class User {
    static adminRole = 'ADMIN'
    static userRole = 'USER'

    @ObjectIdColumn()
    @ApiProperty()
    _id?: string

    @Column()
    @IsNotEmpty()
    @ApiProperty()
    username?: string

    @Column()
    @IsNotEmpty()
    @ApiProperty()
    password?: string

    @Column()
    @IsEmpty()
    @ApiProperty({ enum: [User.adminRole, User.userRole] })
    role?: string

    @Column()
    @IsEmail()
    @ApiProperty()
    email?: string
}
