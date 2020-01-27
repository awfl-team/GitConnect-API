import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<boolean> {
        const user = await this.userService.findByUsername(username)
        return bcrypt.compareSync(password, user?.password || '')
    }

    generateToken(user: User): { token: string } {
        const payload = { username: user.username, sub: user.id }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
