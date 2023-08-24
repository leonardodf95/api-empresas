import { Request, Response } from "express";
import modelLogin from "../models/model.login";
import Login from "../dtos/loginDto";

async function Inserir(req: Request, res: Response) {
  const login = await modelLogin.Inserir(req.body as Login);
  return res.status(201).send(login);
}

async function Editar(req: Request, res: Response) {
  const update = await modelLogin.Editar(req.body as Login);
  return res.status(200).send(update);
}

export default { Inserir, Editar };
