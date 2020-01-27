import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'
import { AuthController } from './controllers/auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { LocalStrategy } from './local.strategy'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './services/auth.service'

@Module({
    imports: [
        DatabaseModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, AuthService, LocalStrategy, JwtStrategy]
})
export class AppModule {}
