import User from '../models/User'
import { db } from '../configs/ormconfig'

interface IUser {
    name: string
    password: string
}

export default async (user: IUser) => {
    const userRepository = db.getRepository(User)

    const result = await userRepository.findOne({
        where: {
            name: user.name,
        },
    })

    return result
}
