import { FindOneOptions, getRepository, Repository } from 'typeorm'

import { User } from '@/app/core/users/infra/entities'
import { UsersRepositoryProvider, CreateUser } from '@/app/core/users/types'

class UsersRepository implements UsersRepositoryProvider {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async create({ full_name, email, password }: CreateUser): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
      profile: {
        full_name,
      },
    })

    await this.ormRepository.save(user)

    return user
  }

  async findById(
    id: string,
    options?: FindOneOptions<User>,
  ): Promise<User | undefined> {
    return this.ormRepository.findOne(id, options)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        email,
      },
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }
}

export { UsersRepository }
