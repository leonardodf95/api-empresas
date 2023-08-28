import Pessoa from "../dtos/pessoaDto";
import FieldError from "../dtos/fieldError";
import { prismaClient } from "../database/PrismaClient";

async function validatePessoa(
  pessoa: Omit<Pessoa, "id">
): Promise<FieldError[]> {
  const erros: FieldError[] = [];

  if (!pessoa.CPF) {
    erros.push({
      field: "cpf",
      message: "CPF não informado",
    });
  } else {
    const cpfCadastrado = await prismaClient.pessoas.count({
      where: { CPF: pessoa.CPF },
    });

    if (cpfCadastrado)
      erros.push({
        field: "cpf",
        message: "CPF já cadastrado",
      });
  }

  if (!pessoa.nome) {
    erros.push({
      field: "nome",
      message: "Nome não informado",
    });
  }
  if (!pessoa.id_empresa) {
    erros.push({
      field: "empresa",
      message: "Empresa não informada",
    });
  }

  const cpfValido = cpfValidation(pessoa.CPF);

  if (!cpfValido) {
    erros.push({
      field: "CPF",
      message: "CPF inválido",
    });
  }

  return erros;
}

async function ValidateUpdatePessoa(pessoa: Pessoa): Promise<FieldError[]> {
  const erros: FieldError[] = [];

  if (pessoa.CPF) {
    const cpfCadastrado = await prismaClient.pessoas.count({
      where: { CPF: pessoa.CPF },
    });

    if (cpfCadastrado) {
      erros.push({
        field: "cpf",
        message: "CPF já cadastrado",
      });
    }
  }

  return erros;
}

function cpfValidation(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) return false;

  let checkDigit = cpf.substring(0, 9);
  let checkDigitArray = Array.from(checkDigit);
  let checkDigitArrayUnique = Array.from(new Set(checkDigitArray));
  if (checkDigitArrayUnique.length === 1) {
    return false;
  }

  let firstCheckDigit = cpf.substring(9, 10);
  let firstCheckDigitValidation = validateCheckDigit(
    checkDigit,
    firstCheckDigit
  );

  if (!firstCheckDigitValidation) {
    return false;
  }

  let secondCheckDigit = cpf.substring(10, 11);
  let secondCheckDigitValidation = validateCheckDigit(
    checkDigit + firstCheckDigit,
    secondCheckDigit
  );
  if (!secondCheckDigitValidation) {
    return false;
  }

  return true;
}

function validateCheckDigit(checkDigit: string, checkDigitToValidate: string) {
  let sum = 0;
  let weight = checkDigit.length + 1;
  for (let i = 0; i < checkDigit.length; i++) {
    sum += parseInt(checkDigit[i]) * weight;
    weight--;
  }
  let rest = sum % 11;
  if (rest < 2) {
    rest = 0;
  } else {
    rest = 11 - rest;
  }
  if (rest !== parseInt(checkDigitToValidate)) {
    return false;
  } else {
    return true;
  }
}

export default { validatePessoa, ValidateUpdatePessoa };
