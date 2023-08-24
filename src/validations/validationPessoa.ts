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

export default { validatePessoa, ValidateUpdatePessoa };
