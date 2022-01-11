import { container } from 'tsyringe'

import { BCryptHashProvider } from '@/app/providers/HashProvider/implementations/BCryptHashProvider'
import { HashProvider } from '@/app/providers/HashProvider/types'

container.registerSingleton<HashProvider>('HashProvider', BCryptHashProvider)
