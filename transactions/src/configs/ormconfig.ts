import { DataSource } from 'typeorm'
import Account from '../models/Account'
import User from '../models/User'
import Transaction from '../models/Transaction'
import AppConfig from './config'

export const db = new DataSource({
    type: 'postgres',
    host: AppConfig.HOST,
    port: 5432,
    username: AppConfig.USERNAME,
    password: AppConfig.PASSWORD,
    database: AppConfig.DATABASE,
    synchronize: true,
    entities: [Account, User, Transaction],
})

db.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err)
    })
