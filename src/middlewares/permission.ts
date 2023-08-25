import { Request, Response, NextFunction } from "express";
import PermissionException from "../exceptions/permissionException";

export function isPermited(roles: number[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log(" rodei:>> 12");
    if (!req.usuario?.role) {
      throw new PermissionException("Sem função definida");
    }

    const permited = roles.find((x) => Number(x) == req.usuario.role);

    if (permited) {
      return next();
    } else {
      throw new PermissionException("Sem permissão");
    }
  };
}
