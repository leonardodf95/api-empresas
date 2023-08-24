import { Request, Response } from "express";
import RoleDto from "../dtos/roleDto";
import modelRoles from "../models/model.roles";

async function Listar(req: Request, res: Response) {
  const filter = req.query;
  const roles = await modelRoles.Listar(filter as unknown as RoleDto);
  return res.status(200).send(roles);
}

async function Inserir(req: Request, res: Response) {
  const roles = await modelRoles.Inserir(req.body as RoleDto);
  return res.status(201).send(roles);
}

async function Editar(req: Request, res: Response) {
  const updates = await modelRoles.Editar(req.body as RoleDto);
  return res.status(201).send(updates);
}

export default { Listar, Inserir, Editar };
