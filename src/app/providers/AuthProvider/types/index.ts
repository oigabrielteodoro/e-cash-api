type AuthProvider = {
  generateToken: (payload: string) => string
}

export { AuthProvider }
