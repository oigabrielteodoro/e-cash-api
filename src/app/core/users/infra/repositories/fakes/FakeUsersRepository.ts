import { v4 as uuid } from 'uuid'

import { User } from '@/app/core/users/infra/entities'
import { CreateUser, UsersRepositoryProvider } from '@/app/core/users/types'

class FakeUsersRepository implements UsersRepositoryProvider {
  private users: User[]

  constructor() {
    this.users = []
  }

  public async create({
    email,
    password,
    full_name,
  }: CreateUser): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      email,
      password,
      profile: {
        id: uuid(),
        full_name,
      },
      created_at: new Date(),
      updated_at: new Date(),
    })

    this.users.push(user)

    return user
  }

  public async deleteById(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email)
  }

  public async save(user: User): Promise<User> {
    return user
  }
}

export { FakeUsersRepository }
