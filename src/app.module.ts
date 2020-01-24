import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { UserService } from './services/user.service'
import { UserController } from './controllers/user.controller'

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService]
})
export class AppModule {}
