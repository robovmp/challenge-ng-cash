import { Request, Response } from 'express'
import moment from 'moment'

const checkHealth = (req: Request, res: Response): Response => {
    const secondsToMilliseconds = (seconds: number) => seconds * 1000

    const momentFormat = (seconds: number) =>
        moment.utc(secondsToMilliseconds(seconds)).format('HH:mm:ss')
    const uptime = momentFormat(process.uptime())

    return res.send({
        apiName: 'nadefy-api',
        uptime: uptime,
    })
}

export default checkHealth
