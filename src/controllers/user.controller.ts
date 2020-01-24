import { Controller, Get } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { User } from '../models/user.model'

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getHello(): Promise<User[]> {
        return this.userService.findAll()
    }
}
