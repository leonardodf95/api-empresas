import { compare, hash } from "bcrypt";
import { prismaClient } from "../database/PrismaClient";
import FieldError from "../dtos/fieldError";
import Login from "../dtos/loginDto";
import FieldException from "../exceptions/fieldException";
import validationLogin from "../validations/validationLogin";
import AuthDto from "../dtos/authDto";
import { Secret, sign } from "jsonwebtoken";

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

  delete novoLogin.senha;

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

  const updates = await prismaClient.login.update({
    where: { id: login.id },
    data,
  });

  delete updates.senha;

  return updates;
}

async function Login(auth: AuthDto) {
  const errors: FieldError[] = validationLogin.ValidationLoginFields(auth);

  if (errors.length > 0) throw new FieldException(errors);

  const usuario = await prismaClient.login.findUnique({
    where: { login: auth.login },
  });

  if (!usuario) {
    throw new Error("Usuário e/ou senha inválido(s)");
  }

  const isValid = await compare(auth.password, usuario.senha);

  if (!isValid) {
    throw new Error("Usuário e/ou senha inválido(s)");
  }

  const pessoa = await prismaClient.pessoas.findUnique({
    where: { id: usuario.id_pessoa },
  });

  const SignKey = process.env.JWT_Sign_Key;

  const jwt = sign(
    {
      login: usuario.login,
      id_role: usuario.id_role,
      id_empresa: pessoa.id_empresa,
    },
    SignKey as Secret,
    { expiresIn: "10h" }
  );

  delete usuario.senha;

  return { ...usuario, jwt };
}

export default { Inserir, Editar, Login };
