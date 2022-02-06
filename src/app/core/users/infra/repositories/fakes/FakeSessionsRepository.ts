import { v4 as uuid } from 'uuid'

import { Session } from '@/app/core/users/infra/entities'
import { SessionsRepositoryProvider } from '@/app/core/users/types'

class FakeSessionsRepository implements SessionsRepositoryProvider {
  private sessions: Session[]

  constructor() {
    this.sessions = []
  }

  public async create(user_id: string): Promise<Session> {
    const session = new Session()

    Object.assign(session, {
      id: uuid(),
      user_id,
      created_at: new Date(),
      active: true,
    })

    this.sessions.push(session)

    return session
  }

  public async findById(session_id: string): Promise<Session | undefined> {
    return this.sessions.find((session) => session.id === session_id)
  }
}

export { FakeSessionsRepository }
