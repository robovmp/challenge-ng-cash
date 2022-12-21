import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import userExists from '../utils/userExists'

type UserAccount = {
    id: string
    name: string
    account: {
        id: string
        balance: number
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, name, value } = req.body

        const debitedAccount: UserAccount = await userExists(id)
        const creditedAccount: UserAccount = await userExists('', name)

        if (debitedAccount.account.id === creditedAccount.account.id)
            throw new Error('Conflited account')

        if (debitedAccount.account.balance < value)
            throw new Error('Insufficient balance.')

        req.body = {
            debitedAccount: debitedAccount.account,
            creditedAccount: creditedAccount.account,
            value,
        }

        next()
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}
