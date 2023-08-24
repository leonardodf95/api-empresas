import { prismaClient } from "../database/PrismaClient";
import Empresa from "../dtos/empresaDto";
import FieldError from "../dtos/fieldError";

async function ValidateInserirEmpresa(
  empresa: Omit<Empresa, "id">
): Promise<FieldError[]> {
  const errors: FieldError[] = [];

  if (!empresa.CNPJ) {
    errors.push({
      field: "cnpj",
      message: "CNPJ não informado",
    });
  }
  if (!empresa.nome) {
    errors.push({
      field: "nome",
      message: "Nome não informado",
    });
  }
  if (!empresa.razao_social) {
    errors.push({
      field: "razao",
      message: "Razao Social não informada",
    });
  }
  if (!empresa.contrato) {
    errors.push({
      field: "contrato",
      message: "Contrato não informado",
    });
  }

  const cnpjCadastrado = await prismaClient.empresas.count({
    where: { CNPJ: empresa.CNPJ },
  });

  if (cnpjCadastrado) {
    errors.push({
      field: "cnpj",
      message: "CNPJ já cadastrado!",
    });
  }

  return errors;
}

async function ValidateUpdateEmpresa(empresa: Empresa): Promise<FieldError[]> {
  const errors: FieldError[] = [];

  if (!empresa.id) {
    errors.push({
      field: "id",
      message: "ID não informado",
    });
  }

  if (!empresa.CNPJ) {
    errors.push({
      field: "cnpj",
      message: "CNPJ não informado",
    });
  }

  const cnpjCadastrado = await prismaClient.empresas.count({
    where: { CNPJ: empresa.CNPJ },
  });

  if (cnpjCadastrado) {
    errors.push({
      field: "cnpj",
      message: "CNPJ já cadastrado!",
    });
  }

  return errors;
}

export default { ValidateInserirEmpresa, ValidateUpdateEmpresa };
