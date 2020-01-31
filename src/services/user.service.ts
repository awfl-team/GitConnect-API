import { Model } from 'mongoose'
import { Inject } from '@nestjs/common'
import { User } from '../models/user.model'
import bcrypt from 'bcrypt'

export class UserService {
    constructor(
        @Inject('USER_PROVIDER')
        private readonly usersProviders: Model<User>
    ) {}

    async create(user: User): Promise<User> {
        user.password = bcrypt.hashSync(user.password, 10)
        const createdUser = new this.usersProviders(user)
        return createdUser.save()
    }

    async findAll(): Promise<User[]> {
        return await this.usersProviders.find().exec()
    }

    async findById(id: string): Promise<User | null> {
        return await this.usersProviders.findById(id).exec()
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.usersProviders.findOne({ username: username }).exec()
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersProviders.findOne({ email: email }).exec()
    }
}
