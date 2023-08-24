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
    return res.send(err.errors).status(err.statusCode);

  return res.send({
    message: genericExceptionMessage,
  });
}
