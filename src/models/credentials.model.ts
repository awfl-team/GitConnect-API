import { ApiProperty } from '@nestjs/swagger'

export class Credentials {
    @ApiProperty()
    login?: string

    @ApiProperty()
    password?: string
}
