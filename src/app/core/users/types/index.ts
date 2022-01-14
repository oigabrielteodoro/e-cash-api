import * as yup from 'yup'
import { FindOneOptions } from 'typeorm'

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

export const createUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  full_name: yup.string().required(),
})

export const authenticateUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export const updateUserProfileSchema = yup.object().shape({
  full_name: yup.string(),
  financial_objective: yup.string(),
  like_be_called: yup.string(),
})
