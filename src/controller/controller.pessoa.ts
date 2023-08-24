import { Request, Response } from "express";
import modelPessoa from "../models/model.pessoa";
import Pessoa from "../dtos/pessoaDto";

async function Inserir(req: Request, res: Response) {
  const pessoa = await modelPessoa.Inserir(req.body as Pessoa);
  return res.status(201).send(pessoa);
}

async function Editar(req: Request, res: Response) {
  const update = await modelPessoa.Editar(req.body as Pessoa);
  return res.status(200).send(update);
}

async function Listar(req: Request, res: Response) {
  const filter = req.query;
  const pessoas = await modelPessoa.Listar(filter as unknown as Pessoa);
  return res.status(200).send(pessoas);
}

export default { Inserir, Editar, Listar };
