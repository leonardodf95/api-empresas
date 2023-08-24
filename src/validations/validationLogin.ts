import { prismaClient } from "../database/PrismaClient";
import Login from "../dtos/loginDto";
import FieldError from "../dtos/fieldError";

async function ValidateInserirLogin(
  login: Omit<Login, "id">
): Promise<FieldError[]> {
  const errors: FieldError[] = [];

  if (!login.login) {
    errors.push({
      field: "login",
      message: "Não informado Login",
    });
  } else {
    const loginCadastrado = await prismaClient.login.count({
      where: { login: login.login },
    });

    if (loginCadastrado) {
      errors.push({
        field: "login",
        message: "Login já cadastrado",
      });
    }
  }
  if (!login.senha) {
    errors.push({
      field: "senha",
      message: "Senha não informada",
    });
  }
  if (!login.id_role) {
    errors.push({
      field: "função",
      message: "Função não informada",
    });
  }
  if (!login.id_pessoa) {
    errors.push({
      field: "pessoa",
      message: "Sem uma pessoa associada",
    });
  }

  return errors;
}

async function ValidateUpdateLogin(
  login: Omit<Login, "id">
): Promise<FieldError[]> {
  const errors: FieldError[] = [];

  if (login.login) {
    const loginCadastrado = await prismaClient.login.count({
      where: { login: login.login },
    });

    if (loginCadastrado) {
      errors.push({
        field: "login",
        message: "Login já cadastrado",
      });
    }
  }

  return errors;
}

export default { ValidateInserirLogin, ValidateUpdateLogin };
