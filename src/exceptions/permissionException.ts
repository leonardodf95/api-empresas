export default class PermissionException {
  public message: string;
  readonly statusCode = 403;

  constructor(message: string) {
    this.message = message;
  }
}
