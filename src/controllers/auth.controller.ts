import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from '../services/auth.service'
import { User } from '../models/user.model'
import { AuthGuard } from '@nestjs/passport'

@ApiTags('Auth')
@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @HttpCode(200)
    login(@Body() user: User): { token: string } {
        return this.authService.generateToken(user)
    }
}
