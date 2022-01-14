import { UsersRepositoryProvider } from '@/app/core/users/types'

import { FakeUsersRepository } from '.'

describe('UsersRepository', () => {
  let usersRepository: UsersRepositoryProvider

  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
  })

  it('should be able create new user', async () => {
    const email = 'example@gmail.com'
    const full_name = 'Example'
    const password = '@Strongpassword123'

    const user = await usersRepository.create({
      email,
      full_name,
      password,
    })

    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
    expect(user.profile.full_name).toBe(full_name)
  })

  it('should be able return user by id', async () => {
    const email = 'example@gmail.com'
    const full_name = 'Example'
    const password = '@Strongpassword123'

    const createdUser = await usersRepository.create({
      email,
      full_name,
      password,
    })

    expect(createdUser.email).toBe(email)
    expect(createdUser.password).toBe(password)
    expect(createdUser.profile.full_name).toBe(full_name)

    const userById = await usersRepository.findById(createdUser.id)

    expect(userById.email).toBe(email)
    expect(userById.password).toBe(password)
    expect(userById.profile.full_name).toBe(full_name)
  })

  it('should be able return user by email', async () => {
    const email = 'example@gmail.com'
    const full_name = 'Example'
    const password = '@Strongpassword123'

    const createdUser = await usersRepository.create({
      email,
      full_name,
      password,
    })

    expect(createdUser.email).toBe(email)
    expect(createdUser.password).toBe(password)
    expect(createdUser.profile.full_name).toBe(full_name)

    const userById = await usersRepository.findByEmail(email)

    expect(userById.email).toBe(email)
    expect(userById.password).toBe(password)
    expect(userById.profile.full_name).toBe(full_name)
  })

  it('should be able return user when user is saved', async () => {
    const email = 'example@gmail.com'
    const full_name = 'Example'
    const password = '@Strongpassword123'
    const emailToUpdate = 'example@updated.com'

    const createdUser = await usersRepository.create({
      email,
      full_name,
      password,
    })

    expect(createdUser.email).toBe(email)
    expect(createdUser.password).toBe(password)
    expect(createdUser.profile.full_name).toBe(full_name)

    Object.assign(createdUser, {
      email: emailToUpdate,
    })

    const savedUser = await usersRepository.save(createdUser)

    expect(savedUser.email).toBe(emailToUpdate)
    expect(savedUser.password).toBe(password)
    expect(savedUser.profile.full_name).toBe(full_name)
  })

  it('should be able delete user by id', async () => {
    const email = 'example@gmail.com'
    const full_name = 'Example'
    const password = '@Strongpassword123'

    const user = await usersRepository.create({
      email,
      full_name,
      password,
    })

    expect(user.email).toBe(email)
    expect(user.password).toBe(password)
    expect(user.profile.full_name).toBe(full_name)

    await expect(usersRepository.deleteById(user.id)).resolves.toBeUndefined()
  })
})
