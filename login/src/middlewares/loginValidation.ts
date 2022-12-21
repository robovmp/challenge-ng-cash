import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import bcrypt from 'bcrypt'
import userExists from '../utils/userExists'

interface IUser {
    name: string
    password: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        let verifyPass
        const user: IUser = req.body

        const result = await userExists(user)

        if (req.baseUrl === '/login' && !result)
            throw new Error('User not exists.')

        if (result) {
            verifyPass = await bcrypt.compare(user.password, result.password)
            req.body.id = result.id
        }

        if (!verifyPass) throw new Error('Incorrect password.')

        next()
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}
