import { Request, Response } from "express";
import modelPessoa from "../models/model.pessoa";
import Pessoa from "../dtos/pessoaDto";
import Empresa from "../dtos/empresaDto";
import PermissionException from "../exceptions/permissionException";

async function Inserir(req: Request, res: Response) {
  const pessoa = req.body as Pessoa;
  if (req.usuario.role === 1 || req.usuario.id_empresa === pessoa.id_empresa) {
    const response = await modelPessoa.Inserir(pessoa);
    return res.status(201).send(response);
  } else {
    throw new PermissionException("Sem permissão");
  }
}

async function Editar(req: Request, res: Response) {
  const update = req.body as Pessoa;

  if (req.usuario.role === 1 || req.usuario.id_empresa === update.id_empresa) {
    const response = await modelPessoa.Editar(update);
    return res.status(200).send(response);
  } else {
    throw new PermissionException("Sem permissão");
  }
}

async function Listar(req: Request, res: Response) {
  if (req.usuario.role === 1) {
    const filter = req.query;
    const pessoas = await modelPessoa.Listar(filter as unknown as Pessoa);
    return res.status(200).send(pessoas);
  } else {
    const filter: Pessoa = req.query as unknown as Pessoa;
    const pessoas = await modelPessoa.Listar(filter);
    return res.status(200).send(pessoas);
  }
}

async function PesquisaPorID(req: Request, res: Response) {
  const { id } = req.params;
  const pessoa = await modelPessoa.PesquisaPorID(id);

  if (pessoa.id_empresa === req.usuario.id_empresa || req.usuario.role === 1) {
    return res.status(200).send(pessoa);
  } else {
    throw new PermissionException("Fora do escopo da empresa");
  }
}

async function PesquisaPorEmpresa(req: Request, res: Response) {
  const filter = req.query as unknown as Empresa;
  if (req.usuario.role === 1) {
    const pessoas = await modelPessoa.PesquisaPorEmpresa(filter);
    return res.status(200).send(pessoas);
  } else {
    const pessoas = await modelPessoa.PesquisaPorEmpresa(filter);

    const Response = pessoas.filter(
      (x) => x.CNPJ === req.usuario.cnpj && req.usuario.id_empresa === x.id
    );

    if (Response.length === 0) {
      throw new PermissionException("Fora do escopo da empresa");
    }
    return res.status(200).send(Response);
  }
}

export default { Inserir, Editar, Listar, PesquisaPorID, PesquisaPorEmpresa };
