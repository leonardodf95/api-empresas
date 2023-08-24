import { hash } from "bcrypt";
import { prismaClient } from "../database/PrismaClient";
import FieldError from "../dtos/fieldError";
import Login from "../dtos/loginDto";
import FieldException from "../exceptions/fieldException";
import validationLogin from "../validations/validationLogin";

async function Inserir(login: Login) {
  const errors: FieldError[] = await validationLogin.ValidateInserirLogin(
    login
  );

  if (errors.length > 0) throw new FieldException(errors);

  const encryptedPassword = await hash(login.senha, 8);

  const novoLogin = await prismaClient.login.create({
    data: {
      login: login.login,
      senha: encryptedPassword,
      id_pessoa: login.id_pessoa,
      id_role: login.id_role,
    },
  });

  return novoLogin;
}

async function Editar(login: Login) {
  const errors: FieldError[] = await validationLogin.ValidateUpdateLogin(login);

  if (errors.length > 0) throw new FieldException(errors);

  const data: any = {};
  if (login.login !== undefined) {
    data.login = login.login;
  }
  if (login.id_role !== undefined) {
    data.id_role = login.id_role;
  }
  if (login.ativo !== undefined) {
    data.ativo = login.ativo;
  }

  const updates = await prismaClient.pessoas.update({
    where: { id: login.id },
    data,
  });

  return updates;
}

export default { Inserir, Editar };
