import { Joi } from 'celebrate'
import { Account } from '@/app/core/accounts/infra/entities'

export type CreateAccount = Omit<Account, 'id' | 'created_at' | 'updated_at'>

export type AccountsRepositoryProvider = {
  create: (data: CreateAccount) => Promise<Account>
  findAllByUserId: (user_id: string) => Promise<Account[]>
  findByName: (name: string, user_id: string) => Promise<Account | undefined>
}

export enum AccountType {
  CHECKING_ACCOUNT = 'CHECKING_ACCOUNT',
  MONEY = 'MONEY',
  SAVINGS = 'SAVINGS',
  INVESTMENTS = 'INVESTMENTS',
  PAYMENT_ACCOUNT = 'PAYMENT_ACCOUNT',
  OTHERS = 'OTHERS',
}

export const createAccountSchema = {
  name: Joi.string().required(),
  banking_institution_id: Joi.string().required(),
  balance: Joi.string().required(),
  category: Joi.string().required(),
  include_sum_on_dashboard: Joi.bool().required(),
  banking_agency: Joi.string().required(),
  banking_account: Joi.string().required(),
}
