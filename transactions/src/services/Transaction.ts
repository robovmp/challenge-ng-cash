import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import userExists from '../utils/userExists'
import { db } from '../configs/ormconfig'
import Transaction from '../models/Transaction'

const index = async (req: Request, res: Response) => {
    try {
        const { id } = req.body

        const order = req.query.order as string

        const { account } = await userExists(id)

        const transactionRepository = db.getRepository(Transaction)

        const cashOut = await transactionRepository.find({
            relations: ['debitedAccount'],
            where: {
                debitedAccount: { id: account.id },
            },
            order: {
                createdAt: order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
            },
        })

        const cashIn = await transactionRepository.find({
            relations: ['creditedAccount'],
            where: {
                creditedAccount: { id: account.id },
            },
            order: {
                createdAt: order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC',
            },
        })

        res.status(StatusCodes.OK).json({ cashOut, cashIn })
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}

const store = async (req: Request, res: Response) => {
    try {
        const { debitedAccount, creditedAccount, value } = req.body
        let createdTransaction

        debitedAccount.balance = parseFloat(debitedAccount.balance) - value
        creditedAccount.balance = parseFloat(creditedAccount.balance) + value

        //rollback
        await db.transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager.save(debitedAccount)
            await transactionalEntityManager.save(creditedAccount)

            const transactionRepository = db.getRepository(Transaction)
            const transaction = new Transaction(
                value,
                debitedAccount,
                creditedAccount
            )
            createdTransaction = await transactionRepository.save(transaction)
        })

        res.status(StatusCodes.OK).json({createdTransaction})
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}

export default {
    index,
    store,
}
