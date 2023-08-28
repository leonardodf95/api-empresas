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
  } else {
    const cnpjCadastrado = await prismaClient.empresas.count({
      where: { CNPJ: empresa.CNPJ },
    });

    if (cnpjCadastrado) {
      errors.push({
        field: "cnpj",
        message: "CNPJ já cadastrado!",
      });
    }

    const cpnjValido = validateCNPJ(empresa.CNPJ);

    if (!cpnjValido) {
      errors.push({
        field: "cnpj",
        message: "CNPJ informado é inválido",
      });
    }
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

  if (empresa.CNPJ) {
    const cnpjCadastrado = await prismaClient.empresas.count({
      where: {
        AND: { CNPJ: empresa.CNPJ, NOT: { id: empresa.id } },
      },
    });

    if (cnpjCadastrado) {
      errors.push({
        field: "cnpj",
        message: "CNPJ já cadastrado!",
      });
    }
  }

  return errors;
}

function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (/^(\d)\1+$/.test(cnpj)) {
    console.log("2");
    return false;
  }
  // Valida DVs
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado.toString() != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado.toString() != digitos.charAt(1)) return false;

  return true;
}

export default { ValidateInserirEmpresa, ValidateUpdateEmpresa };
