import { FindOneOptions } from 'typeorm'
import { Joi } from 'celebrate'

import { User, Session, Profile } from '@/app/core/users/infra/entities'

export type CreateUser = {
  full_name: string
} & Pick<User, 'email' | 'password'>
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
}

export type AuthenticateResponse = {
  user: Omit<User, 'password'>
  token: string
}

export const createUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  full_name: Joi.string().required(),
}

export const authenticateUserSchema = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}

export const updateUserProfileSchema = {
  full_name: Joi.string(),
  financial_objective: Joi.string(),
  like_be_called: Joi.string(),
}
