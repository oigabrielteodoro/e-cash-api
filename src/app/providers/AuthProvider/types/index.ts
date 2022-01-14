type AuthProvider = {
  generateToken: (payload: string) => string
  verifyToken: (token: string) => string
}

type TokenPayload = {
  sub: string
}

export { AuthProvider, TokenPayload }
