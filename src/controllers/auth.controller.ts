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
        const isValid = await this.authService.validateLoginUser(credentials)
        return isValid ? this.authService.generateToken(user) : ''
    }

    @Post('register')
    async register(@Body() user: User): Promise<BadRequestException | void> {
        const validateRegister = await this.authService.validateRegisterUser(user)
        if (validateRegister) {
            await this.userService.createUser(user)
        } else {
            return new BadRequestException(validateRegister)
        }
    }
}
