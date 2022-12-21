import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import Account from '../models/Account'
import User from '../models/User'
import { db } from '../configs/ormconfig'
import bcrypt from 'bcrypt'

const index = async (req: Request, res: Response) => {
    try {
        const { id } = req.body

        const userRepository = db.getRepository(User)

        const result = await userRepository.findOne({
            where: {
                id: id,
            },
            relations: ['account'],
        })

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
    }
}

const store = async (req: Request, res: Response) => {
    try {
        const accountRepository = db.getRepository(Account)
        const account = new Account()
        const accountCreated = await accountRepository.save(account)

        const { name, password } = req.body

        const passwordHash = bcrypt.hashSync(password, 8)

        const userRepository = db.getRepository(User)
        const user = new User(name, passwordHash, account)

        await userRepository
            .save(user)
            //Remove conta caso não seja criado um usuário
            .catch(() => accountRepository.delete(accountCreated.id))

        res.status(StatusCodes.OK).json(ReasonPhrases.OK)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
    }
}

export default {
    index,
    store,
}
