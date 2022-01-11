import { v4 as uuid } from 'uuid'

import { Session } from '@/app/core/users/infra/entities'
import { SessionsHandler } from '@/app/core/users/types'

class FakeSessionsRepository implements SessionsHandler {
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
    })

    this.sessions.push(session)

    return session
  }
}

export { FakeSessionsRepository }
