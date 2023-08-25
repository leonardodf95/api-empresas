import { NextFunction, Request, Response } from "express";
import FieldException from "../exceptions/fieldException";
import { genericExceptionMessage } from "../utils/constants";
import AuthException from "../exceptions/authException";
import PermissionException from "../exceptions/permissionException";

export default async function errorsMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof FieldException)
    return res.status(err.statusCode).send(err.errors);

  if (err instanceof AuthException)
    return res.status(err.statusCode).send(err.message);

  if (err instanceof PermissionException)
    return res.status(err.statusCode).send(err.message);

  return res.status(500).send({
    message: genericExceptionMessage,
  });
}
