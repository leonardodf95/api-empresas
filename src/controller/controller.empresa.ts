import { Request, Response } from "express";
import modelEmpresa from "../models/model.empresa";
import Empresa from "../dtos/empresaDto";

async function Inserir(req: Request, res: Response) {
  const Empresa = await modelEmpresa.Inserir(req.body as Empresa);
  return res.status(201).send(Empresa);
}

async function Editar(req: Request, res: Response) {
  const updates = await modelEmpresa.Editar(req.body as Empresa);
  return res.status(200).send(updates);
}

async function Listar(req: Request, res: Response) {
  const filter = req.query;
  const Empresas = await modelEmpresa.Listar(filter as unknown as Empresa);
  return res.status(200).send(Empresas);
}

export default { Inserir, Listar, Editar };
