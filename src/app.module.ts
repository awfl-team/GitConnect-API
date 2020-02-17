import { Module } from '@nestjs/common'
import { UserController } from './controllers/user.controller'
import { AuthController } from './controllers/auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants'
import { JwtStrategy } from './jwt.strategy'
import { AuthService } from './services/auth.service'
import { UserService } from './services/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './models/user.model'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://localhost/git-connect',
            entities: [User],
            synchronize: true,
            useNewUrlParser: true,
            logging: true
        }),
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' }
        })
    ],
    controllers: [UserController, AuthController],
    providers: [AuthService, JwtStrategy, UserService]
})
export class AppModule {}
