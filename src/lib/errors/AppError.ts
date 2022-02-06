class AppError {
  public readonly id: string
  public readonly message: string
  public readonly statusCode: number

  constructor(id: string, message: string, statusCode = 400) {
    this.id = id
    this.message = message
    this.statusCode = statusCode
  }
}

export { AppError }
