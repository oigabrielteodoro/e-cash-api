declare global {
  /* eslint-disable no-unused-vars */
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number
      JWT_SECRET: string
      JWT_EXPIRES_IN: string
    }
  }
}
export {}
