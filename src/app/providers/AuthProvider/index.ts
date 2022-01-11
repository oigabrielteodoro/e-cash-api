import { container } from 'tsyringe'

import { AuthProvider } from '@/app/providers/AuthProvider/types'
import { JWTAuthProvider } from '@/app/providers/AuthProvider/implementations/JWTAuthProvider'

container.registerSingleton<AuthProvider>('AuthProvider', JWTAuthProvider)
