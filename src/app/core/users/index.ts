import { container } from 'tsyringe'

import { UsersHandler, SessionsHandler } from '@/app/core/users/types'
import {
  UsersRepository,
  SessionsRepository,
} from '@/app/core/users/infra/repositories'

container.registerSingleton<UsersHandler>('UsersRepository', UsersRepository)
container.registerSingleton<SessionsHandler>(
  'SessionsRepository',
  SessionsRepository,
)
