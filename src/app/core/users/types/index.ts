import { FindOneOptions } from 'typeorm'
import { Joi } from 'celebrate'

import { User, Session, Profile } from '@/app/core/users/infra/entities'

export type CreateUser = Pick<User, 'email' | 'password'> &
  Pick<
    Profile,
    'full_name' | 'financial_objective' | 'monthly_income' | 'like_be_called'
  >
export type AuthenticateUser = Pick<User, 'email' | 'password'>
export type UpdateUser = Omit<Profile, 'id' | 'user' | 'updated_at'>

export type UsersRepositoryProvider = {
  create(data: CreateUser): Promise<User>
  deleteById(id: string): Promise<void>
  findById(
    id: string,
    options?: FindOneOptions<User>,
  ): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  save(user: User): Promise<User>
}

export type SessionsRepositoryProvider = {
  create(user_id: string): Promise<Session>
  findById(session_id: string): Promise<Session | undefined>
  save(session: Session): Promise<Session>
}

export type AuthenticateResponse = {
  user_id: string
  token: string
  session_id: string
}

export const createUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  fullName: Joi.string().required(),
  financialObjective: Joi.string().required(),
  monthlyIncome: Joi.string().required(),
  likeBeCalled: Joi.string().required(),
}

export const authenticateUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

export const updateUserProfileSchema = {
  fullName: Joi.string(),
  financialObjective: Joi.string(),
  likeBeCalled: Joi.string(),
}

export const renewSessionUserSchema = {
  userId: Joi.string().uuid().required(),
  sessionId: Joi.string().uuid().required(),
}

export const logOutUserSchema = {
  sessionId: Joi.string().uuid().required(),
}
