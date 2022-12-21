import { Request, Response } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import AppConfig from '../configs/config'

interface IUser {
    id: string
    name: string
    password: string
}

const store = async (req: Request, res: Response) => {
    try {
        const user: IUser = req.body

        const tokenUser = jwt.sign({ id: user.id }, AppConfig.JWT_PASS, {
            expiresIn: '1d',
        })

        res.status(StatusCodes.OK).json({ token: tokenUser })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
    }
}

export default {
    store,
}
