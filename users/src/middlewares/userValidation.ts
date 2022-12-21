import { Request, Response, NextFunction } from 'express'
import userJoiValidation from '../utils/userJoiValidation'
import userExists from '../utils/userExists'
import { StatusCodes } from 'http-status-codes'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = req

        userJoiValidation(body)

        const result = await userExists(body)

        if (req.baseUrl === '/users' && result)
            throw new Error('User already exists.')

        if (req.baseUrl === '/login' && !result)
            throw new Error('User not exists.')

        next()
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}
