import { Injectable } from '@nestjs/common'
import { UserService } from './user.service'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import { JwtService } from '@nestjs/jwt'
import { Credentials } from '../models/credentials.model'

@Injectable()
export class AuthService {
    static mailFormat = /^[a-zA-Z0-9-+_+]+@.+\.[a-zA-Z0-9-+_+]+$/

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(credentials: Credentials): Promise<boolean> {
        let user: User | null
        if (credentials.login) {
            AuthService.mailFormat.test(credentials.login)
                ? (user = await this.userService.findByEmail(credentials.login))
                : (user = await this.userService.findByUsername(credentials.login))
            return bcrypt.compareSync(credentials.password, user?.password || '')
        }
        return false
    }

    generateToken(user: User): { token: string } {
        const payload = { username: user.username, sub: user.id }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
