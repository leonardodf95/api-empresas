import { prismaClient } from "../database/PrismaClient";
import FieldError from "../dtos/fieldError";
import Pessoa from "../dtos/pessoaDto";
import FieldException from "../exceptions/fieldException";
import validationPessoa from "../validations/validationPessoa";

async function Inserir(pessoa: Pessoa) {
  const errors: FieldError[] = await validationPessoa.validatePessoa(pessoa);

  if (errors.length > 0) throw new FieldException(errors);

  const novaPessoa = await prismaClient.pessoas.create({
    data: {
      CPF: pessoa.CPF,
      nome: pessoa.nome,
      id_empresa: pessoa.id_empresa,
    },
  });

  return novaPessoa;
}

async function Editar(pessoa: Pessoa) {
  const errors: FieldError[] = await validationPessoa.ValidateUpdatePessoa(
    pessoa
  );

  if (errors.length > 0) throw new FieldException(errors);
  const data: any = {};
  if (pessoa.CPF !== undefined) {
    data.CPF = pessoa.CPF;
  }
  if (pessoa.nome !== undefined) {
    data.nome = pessoa.nome;
  }
  if (pessoa.ativo !== undefined) {
    data.ativo = pessoa.ativo;
  }
  if (pessoa.id_empresa !== undefined) {
    data.id_empresa = pessoa.id_empresa;
  }

  const updates = await prismaClient.pessoas.update({
    where: { id: pessoa.id },
    data,
  });

  return updates;
}

async function Listar(params: Pessoa) {
  const where: any = {};
  if (params.id !== undefined) {
    where.OR = [{ id: params.id }];
  }
  if (params.CPF !== undefined) {
    where.OR = where.OR = where.OR || [];
    where.OR.push({ CPF: params.CPF });
  }
  if (params.nome !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ nome: params.nome });
  }
  if (params.id_empresa !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ id_empresa: params.id_empresa });
  }
  if (params.ativo !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ ativo: params.ativo });
  }

  const pessoas = await prismaClient.pessoas.findMany({
    where,
  });

  return pessoas;
}

export default { Inserir, Editar, Listar };
