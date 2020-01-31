import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from '../services/auth.service'
import { User } from '../models/user.model'
import { Credentials } from '../models/credentials.model'
import { UserService } from '../services/user.service'

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() credentials: Credentials): Promise<{ token: string } | string> {
        const user = { username: credentials.login, password: credentials.password } as User
        const isValid = await this.authService.validateUser(credentials)
        return isValid ? this.authService.generateToken(user) : ''
    }

    @Post('register')
    async register(@Body() user: User): Promise<BadRequestException | void> {
        const userByEmail = await this.userService.findByEmail(user.email ?? '')
        const userByUsername = await this.userService.findByUsername(user.username ?? '')

        if (userByEmail !== null && userByUsername !== null) {
            return new BadRequestException('username and email exist')
        }
        if (userByEmail !== null) {
            return new BadRequestException('email exist')
        }
        if (userByUsername !== null) {
            return new BadRequestException('username exist')
        }
        user.role = User.userRole
        await this.userService.create(user)
    }
}
