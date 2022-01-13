import { getRepository, Repository } from 'typeorm'

import { Session } from '@/app/core/users/infra/entities'
import { SessionsRepositoryProvider } from '@/app/core/users/types'

class SessionsRepository implements SessionsRepositoryProvider {
  private ormRepository: Repository<Session>

  constructor() {
    this.ormRepository = getRepository(Session)
  }

  public async create(user_id: string): Promise<Session> {
    const session = this.ormRepository.create({
      user_id,
      active: true,
    })

    await this.ormRepository.save(session)

    return session
  }
}

export { SessionsRepository }
