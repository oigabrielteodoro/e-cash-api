import * as yup from 'yup'

import { User, Session } from '@/app/core/users/infra/entities'

type CreateUser = Pick<User, 'email' | 'password'>
type AuthenticateUser = Pick<User, 'email' | 'password'>

type UsersHandler = {
  create(data: CreateUser): Promise<User>
  deleteById(id: string): Promise<void>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  save(user: User): Promise<User>
}

type SessionsHandler = {
  create(user_id: string): Promise<Session>
}

type AuthenticateResponse = {
  user: Omit<User, 'password'>
  token: string
}

const createUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const authenticateUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

export {
  createUserSchema,
  authenticateUserSchema,
  AuthenticateUser,
  AuthenticateResponse,
  CreateUser,
  UsersHandler,
  SessionsHandler,
}
