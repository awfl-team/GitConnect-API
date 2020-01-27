import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { User } from '../models/user.model'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<User | null> {
        return this.userService.findById(id)
    }

    @Post()
    async create(@Body() user: User): Promise<void> {
        await this.userService.create(user)
    }
}
