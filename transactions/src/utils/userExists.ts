import User from '../models/User'
import { db } from '../configs/ormconfig'

export default async (id: string, name?: string) => {
    const userRepository = db.getRepository(User)

    const result = await userRepository.findOne({
        where: [{ id }, { name }],
        relations: ['account'],
    })

    if (!result) throw new Error('User not exists.')

    return result
}
