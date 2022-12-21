import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
} from 'typeorm'
import { v4 as uuid } from 'uuid'
import Account from './Account'

@Entity('users')
export default class User {
    constructor(name: string, password: string, account: Account) {
        this.id = uuid()
        this.created_at = new Date()
        this.name = name
        this.password = password
        this.account = account
    }

    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    password: string

    @OneToOne(() => Account, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'account_id' })
    account: Account

    @CreateDateColumn()
    created_at: Date
}
