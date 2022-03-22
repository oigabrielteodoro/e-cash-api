import { Joi } from 'celebrate'
import { Account } from '@/app/core/accounts/infra/entities'

export type CreateAccount = Omit<Account, 'id' | 'created_at' | 'updated_at'>
export type DeleteAccount = {
  user_id: string
  account_id: string
}

export type AccountsRepositoryProvider = {
  create: (data: CreateAccount) => Promise<Account>
  findAllByUserId: (user_id: string) => Promise<Account[]>
  findByName: (name: string, user_id: string) => Promise<Account | undefined>
  findBy: (params: Partial<Account>) => Promise<Account | undefined>
  delete: (account_id: string) => Promise<void>
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
  bankingInstitutionId: Joi.string().required(),
  balance: Joi.string().required(),
  category: Joi.string().required(),
  includeSumOnDashboard: Joi.bool().required(),
  agencyNumber: Joi.string().required(),
  accountNumber: Joi.string().required(),
}

export const deleteAccountSchema = {
  accountId: Joi.string().uuid().required(),
}
