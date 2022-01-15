import { v4 as uuid } from 'uuid'
import { CategoriesRepositoryProvider } from '@/app/core/categories/types'

import { FakeCategoriesRepository } from '.'

describe('CategoriesRepository', () => {
  let categoriesRespository: CategoriesRepositoryProvider

  beforeEach(() => {
    categoriesRespository = new FakeCategoriesRepository()
  })

  it('should be able create category successfully', async () => {
    const name = 'Education'
    const description = 'Bills for education'
    const user_id = uuid()

    const category = await categoriesRespository.create({
      user_id,
      name,
      description,
    })

    expect(category.name).toBe(name)
    expect(category.user_id).toBe(user_id)
    expect(category.description).toBe(description)
  })

  it('should be able find all categories by user id', async () => {
    const name = 'Education'
    const description = 'Bills for education'
    const user_id = uuid()

    const category = await categoriesRespository.create({
      user_id,
      name,
      description,
    })

    expect(category.name).toBe(name)
    expect(category.user_id).toBe(user_id)
    expect(category.description).toBe(description)

    const categories = await categoriesRespository.findAllByUserId(user_id)

    expect(categories).toEqual([category])
  })

  it('should be able find category by name and user_id', async () => {
    const name = 'Education'
    const description = 'Bills for education'
    const user_id = uuid()

    await categoriesRespository.create({
      user_id,
      name,
      description,
    })

    const category = await categoriesRespository.findByName({
      name,
      user_id,
    })

    expect(category.name).toBe(name)
    expect(category.user_id).toBe(user_id)
    expect(category.description).toBe(description)
  })

  it('should be able delete category based on id', async () => {
    const name = 'Education'
    const description = 'Bills for education'
    const user_id = uuid()

    const category = await categoriesRespository.create({
      user_id,
      name,
      description,
    })

    expect(category.name).toBe(name)
    expect(category.user_id).toBe(user_id)
    expect(category.description).toBe(description)

    await expect(
      categoriesRespository.deleteById(category.id),
    ).resolves.toBeUndefined()

    const categories = await categoriesRespository.findAllByUserId(user_id)

    expect(categories).toEqual([])
  })
})
