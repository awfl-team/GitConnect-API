import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import { JwtService } from '@nestjs/jwt'
import { Credentials } from '../models/credentials.model'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
    static mailFormat = /^[a-zA-Z0-9-+_+]+@.+\.[a-zA-Z0-9-+_+]+$/

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async validateLoginUser(credentials: Credentials): Promise<boolean> {
        let user: User | undefined
        if (credentials.login) {
            AuthService.mailFormat.test(credentials.login)
                ? (user = await this.usersRepository.findOne({ email: credentials.login }))
                : (user = await this.usersRepository.findOne({ username: credentials.login }))
            return bcrypt.compareSync(credentials.password, user?.password || '')
        }
        return false
    }

    async validateRegisterUser(user: User): Promise<boolean | string> {
        const userByEmail = await this.usersRepository.findOne({ email: user.email })
        const userByUsername = await this.usersRepository.findOne({ username: user.username })

        if (userByEmail !== null && userByUsername !== null) {
            return 'username and email exist'
        }
        if (userByEmail !== null) {
            return 'email exist'
        }
        if (userByUsername !== null) {
            return 'username exist'
        }
        return true
    }

    generateToken(user: User): { token: string } {
        const payload = { username: user.username, sub: user._id }
        return {
            token: this.jwtService.sign(payload)
        }
    }
}
