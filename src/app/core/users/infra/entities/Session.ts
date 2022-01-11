import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

import { User } from '.'

@Entity('sessions')
class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id: string

  @Column()
  active: boolean

  @CreateDateColumn()
  created_at: Date
}

export { Session }
