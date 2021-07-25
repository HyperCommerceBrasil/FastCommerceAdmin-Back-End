class AppError {
  public readonly message: string;

  public readonly statusCode: number;
  public readonly code: number;

  constructor(message: string, statusCode = 400, code = 0) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}

export default AppError;
