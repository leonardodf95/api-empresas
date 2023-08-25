import { prismaClient } from "../database/PrismaClient";
import Empresa from "../dtos/empresaDto";
import FieldError from "../dtos/fieldError";
import FieldException from "../exceptions/fieldException";
import validationEmpresa from "../validations/validationEmpresa";

async function Inserir(empresa: Omit<Empresa, "id">) {
  const errors: FieldError[] = await validationEmpresa.ValidateInserirEmpresa(
    empresa
  );

  if (errors.length > 0) throw new FieldException(errors);

  const novaEmpresa = await prismaClient.empresas.create({
    data: {
      nome: empresa.nome,
      razao_social: empresa.razao_social,
      CNPJ: empresa.CNPJ,
      contrato: empresa.contrato,
    },
  });
  return novaEmpresa;
}

async function Editar(empresa: Empresa) {
  const errors: FieldError[] = await validationEmpresa.ValidateUpdateEmpresa(
    empresa
  );

  if (errors.length > 0) throw new FieldException(errors);

  const data: any = {};
  if (empresa.CNPJ !== undefined) {
    data.CNPJ = empresa.CNPJ;
  }
  if (empresa.nome !== undefined) {
    data.nome = empresa.nome;
  }
  if (empresa.contrato !== undefined) {
    data.contrato = empresa.contrato;
  }
  if (empresa.razao_social !== undefined) {
    data.razao_social = empresa.razao_social;
  }

  if (empresa.ativo !== undefined) {
    data.ativo = empresa.ativo;
  }

  const updates = await prismaClient.empresas.update({
    where: { id: empresa.id },
    data,
  });

  return updates;
}

async function Listar(params: Empresa) {
  const where: any = {};

  if (params.CNPJ !== undefined) {
    where.OR = where.OR = where.OR || [];
    where.OR.push({ CNPJ: params.CNPJ });
  }
  if (params.nome !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ nome: params.nome });
  }
  if (params.contrato !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ contrato: params.contrato });
  }
  if (params.razao_social !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ razao_social: params.razao_social });
  }
  if (params.ativo !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ ativo: params.ativo });
  }

  const empresas = await prismaClient.empresas.findMany({
    where,
  });

  return empresas;
}

async function PesquisaPorID(id: string) {
  const parsedID = parseInt(id);

  const empresa = await prismaClient.empresas.findUnique({
    where: { id: parsedID },
  });

  return empresa;
}

export default { Inserir, Listar, Editar, PesquisaPorID };
