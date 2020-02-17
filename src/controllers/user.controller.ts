import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { User } from '../models/user.model'
import { ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@ApiTags('User')
@Controller('users')
export class UserController {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    @Get()
    findAll(): Promise<User[]> {
        const test = this.usersRepository.find()
        return test
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<User | undefined> {
        return this.usersRepository.findOne(id)
    }

    @Post()
    create(@Body() user: User): void {
        this.usersRepository.create(user)
    }
}
