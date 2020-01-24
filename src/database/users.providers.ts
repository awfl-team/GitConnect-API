import { Connection, Model, Document } from 'mongoose'
import { UserSchema } from '../shemas/user.schema'

export const usersProviders = [
    {
        provide: 'USER_PROVIDER',
        useFactory: (connection: Connection): Model<Document> =>
            connection.model('User', UserSchema),
        inject: ['DATABASE_CONNECTION']
    }
]
