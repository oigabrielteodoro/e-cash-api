import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('accounts')
class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('uuid')
  user_id: string

  @Column()
  name: string

  @Column()
  banking_institution_id: string

  @Column()
  balance: string

  @Column()
  category: string

  @Column()
  agency_number: string

  @Column()
  account_number: string

  @Column()
  include_sum_on_dashboard: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export { Account }
