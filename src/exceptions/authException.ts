export default class AuthException {
  public message: string;
  readonly statusCode = 403;

  constructor(message: string) {
    this.message = message;
  }
}
