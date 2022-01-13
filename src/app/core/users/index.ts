import { container } from 'tsyringe'

import {
  UsersRepositoryProvider,
  SessionsRepositoryProvider,
} from '@/app/core/users/types'
import {
  UsersRepository,
  SessionsRepository,
} from '@/app/core/users/infra/repositories'

container.registerSingleton<UsersRepositoryProvider>(
  'UsersRepository',
  UsersRepository,
)
container.registerSingleton<SessionsRepositoryProvider>(
  'SessionsRepository',
  SessionsRepository,
)
