import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './services/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super()
    }

    async validate(username: string, password: string): Promise<any> {
        const isValid = await this.authService.validateUser(username, password)
        if (!isValid) {
            throw new UnauthorizedException()
        }
        return isValid
    }
}
