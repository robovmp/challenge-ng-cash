import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import AppConfig from '../configs/config'

type Payload = {
    id: string
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers

        if (!authorization) throw new Error('Not authorized.')

        const token = authorization.split(' ')[1]

        const { id } = jwt.verify(token, AppConfig.JWT_PASS) as Payload

        req.body.id = id

        next()
    } catch (error) {
        const message = (error as Error).message
        res.status(StatusCodes.BAD_REQUEST).json({ error: message })
    }
}
