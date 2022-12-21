import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import Account from './Account'

@Entity('transaction')
export default class Transaction {
    constructor(
        value: number,
        debitedAccount: Account,
        creditedAccount: Account
    ) {
        this.id = uuid()
        this.createdAt = new Date().getTime()
        this.value = value
        this.debitedAccount = debitedAccount
        this.creditedAccount = creditedAccount
    }

    @PrimaryColumn()
    id: string

    @ManyToOne(() => Account, (account) => account.id)
    debitedAccount: Account

    @ManyToOne(() => Account, (account) => account.id)
    creditedAccount: Account

    @Column({ type: 'decimal', precision: 15, scale: 2 })
    value: number

    @Column({type: 'bigint'})
    createdAt: number
}
