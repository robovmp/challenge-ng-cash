import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('accounts')
export default class Account {
    constructor() {
        this.id = uuid()
        this.balance = 100.0
    }

    @PrimaryColumn()
    id: string

    @Column({ type: 'decimal', precision: 15, scale: 2, default: 100.0 })
    balance: number
}
