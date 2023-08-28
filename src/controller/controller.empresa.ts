import { Request, Response } from "express";
import modelEmpresa from "../models/model.empresa";
import Empresa from "../dtos/empresaDto";
import FieldException from "../exceptions/fieldException";
import FieldError from "../dtos/fieldError";

async function Inserir(req: Request, res: Response) {
  const Empresa = await modelEmpresa.Inserir(req.body as Empresa);
  return res.status(201).send(Empresa);
}

async function Editar(req: Request, res: Response) {
  const edicoes = req.body as Empresa;

  if (req.usuario.role !== 1 && Number(edicoes.id) !== req.usuario.id_empresa) {
    const error: FieldError[] = [
      {
        field: "empresa",
        message: "Empresa fora do escopo do usuário!",
      },
    ];
    throw new FieldException(error);
  } else {
    const updates = await modelEmpresa.Editar(req.body as Empresa);
    return res.status(200).send(updates);
  }
}

async function Listar(req: Request, res: Response) {
  if (req.usuario.role === 1) {
    const filter = req.query;
    const Empresas = await modelEmpresa.Listar(filter as unknown as Empresa);
    return res.status(200).send(Empresas);
  }

  if (req.usuario.role !== 1) {
    const filter: Omit<
      Empresa,
      "nome" | "razao_social" | "contrato" | "ativo"
    > = {
      id: req.usuario.id_empresa,
      CNPJ: req.usuario.cnpj,
    };
    const Empresas = await modelEmpresa.Listar(filter as unknown as Empresa);
    const Response = Empresas.find((x) => x.id === req.usuario.id_empresa);

    return res.status(200).send(Response);
  }
}

async function PesquisaPorID(req: Request, res: Response) {
  const { id } = req.params;
  const empresa = await modelEmpresa.PesquisaPorID(id);
  return res.status(200).send(empresa);
}

export default { Inserir, Listar, Editar, PesquisaPorID };
