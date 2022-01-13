import { CreateUser, UsersRepositoryProvider } from '@/app/core/users/types'
const initialData = {
  full_name: 'Example',
  email: 'example@mail.com',
  password: '123456',
}

export function buildUser(
  repository: UsersRepositoryProvider,
  data?: CreateUser,
) {
  return repository.create(data || initialData)
}
