import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export class User extends Document {
    @ApiProperty()
    id?: string

    @ApiProperty()
    username?: string

    @ApiProperty()
    password?: string
}
