import { container } from 'tsyringe'

import { CategoriesRepository } from '@/app/core/categories/infra/repositories'
import { CategoriesRepositoryProvider } from '@/app/core/categories/types'

container.registerSingleton<CategoriesRepositoryProvider>(
  'CategoriesRepository',
  CategoriesRepository,
)
