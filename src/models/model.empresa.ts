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

async function Listar(params: Empresa) {
  const where: any = {};
  if (params.id !== undefined) {
    where.OR = [{ id: params.id }];
  }
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
}

export default { Inserir, Listar };
