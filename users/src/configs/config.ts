import * as dotenv from 'dotenv'
dotenv.config()

type IAppConfig = {
    APP_NAME: string
    APP_VERSION: string
    CONNECTION: string
    HOST: string
    PORT: number
    USERNAME: string
    PASSWORD: string
    DATABASE: string
    JWT_PASS: string
}

const AppConfig: IAppConfig = {
    APP_NAME: process.env.APP_NAME || 'ng-cash-api',
    APP_VERSION: process.env.APP_VERSION || '0.0.1',
    CONNECTION: process.env.CONNECTION || 'postgres',
    HOST: process.env.HOST || 'localhost',
    PORT: parseInt(process.env.PORT as string) || 3000,
    USERNAME: process.env.USERNAME || 'postgres',
    PASSWORD: process.env.PASSWORD || 'postgres',
    DATABASE: process.env.DATABASE || 'postgres',
    JWT_PASS: process.env.JWT_PASS || '',
}

export default AppConfig
