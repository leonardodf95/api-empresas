import { NextFunction, Request, Response } from "express";
import FieldException from "../exceptions/fieldException";
import { genericExceptionMessage } from "../utils/constants";

export default async function errorsMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof FieldException)
    return res.status(err.statusCode).send(err.errors);

  return res.status(500).send({
    message: genericExceptionMessage,
  });
}
