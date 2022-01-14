import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { BankAccountType } from '@/app/core/bank_accounts/types'

@Entity('bank_accounts')
class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  description?: string

  @Column()
  bank_flag: string

  @Column('uuid')
  user_id: string

  @Column()
  balance: string

  @Column()
  include_sum_main_screen: boolean

  @Column('varchar')
  account_type: BankAccountType

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export { BankAccount }
