type HashProvider = {
  generateHash(stringToHash: string, count?: number): Promise<string>
  compareHash(payload: string, hashed: string): Promise<boolean>
}

export { HashProvider }
