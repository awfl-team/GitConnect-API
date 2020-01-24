import { Model } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'
import { User } from '../models/user.model'

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_PROVIDER')
        private readonly usersProviders: Model<User>
    ) {}

    async create(user: User): Promise<User> {
        const createdCat = new this.usersProviders(user)
        return createdCat.save()
    }

    async findAll(): Promise<User[]> {
        return this.usersProviders.find().exec()
    }
}
