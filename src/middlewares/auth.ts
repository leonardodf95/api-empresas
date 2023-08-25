import { Request, Response, NextFunction } from "express";
import jwt, { GetPublicKeyOrSecret, Secret } from "jsonwebtoken";
import AuthException from "../exceptions/authException";

export const JwtSignKey = process.env.JWT_Sign_Key;

interface JwtPayload {
  login: string;
  id_role: number;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.path === "/v1/login" && req.method === "POST") return next();
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AuthException("Não informado Token!");
  }

  const [_, token] = authHeader.split(" ");

  if (!token) {
    throw new AuthException("Token inválido!");
  }

  try {
    const tokenSignKey = process.env.JWT_Sign_Key;
    const decodedToken = jwt.verify(
      token,
      tokenSignKey as Secret | GetPublicKeyOrSecret
    );

    const { login, id_role } = decodedToken as unknown as JwtPayload;

    req.usuario = {
      login,
      role: id_role,
    };

    return next();
  } catch {
    throw new AuthException("Token inválido!");
  }
}
