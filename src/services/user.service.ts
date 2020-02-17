import { User } from '../models/user.model'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'

export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async createUser(user: User): Promise<void> {
        user.role = User.userRole
        user.password = bcrypt.hashSync(user.password, 10)
        await this.usersRepository.save(user)
    }
}
