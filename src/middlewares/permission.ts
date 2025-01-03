import { Request, Response, NextFunction } from "express";
import PermissionException from "../exceptions/permissionException";

export function isPermited(roles: number[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario?.role) {
      throw new PermissionException("Sem função definida");
    }
    if (req.usuario.role === 1) {
      return next();
    }

    const permited = roles.find((x) => Number(x) == req.usuario.role);

    if (permited) {
      return next();
    } else {
      throw new PermissionException("Sem permissão");
    }
  };
}
