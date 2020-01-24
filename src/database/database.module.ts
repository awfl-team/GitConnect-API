import { Module } from '@nestjs/common'
import { databaseProviders } from './database.providers'
import { usersProviders } from './users.providers'

@Module({
    providers: [...databaseProviders, ...usersProviders],
    exports: [...databaseProviders, ...usersProviders]
})
export class DatabaseModule {}
