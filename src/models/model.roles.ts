import { prismaClient } from "../database/PrismaClient";
import FieldError from "../dtos/fieldError";
import RoleDto from "../dtos/roleDto";
import FieldException from "../exceptions/fieldException";

async function Inserir(role: Omit<RoleDto, "id">) {
  const errors: FieldError[] = [];

  if (!role.descricao) {
    errors.push({
      field: "nome",
      message: "Função sem nome",
    });
  }

  if (errors.length > 0) throw new FieldException(errors);

  const newRole = await prismaClient.roles.create({
    data: {
      descricao: role.descricao,
    },
  });

  return newRole;
}

async function Editar(role: RoleDto) {
  const erro: FieldError[] = [];
  const descricaoUsada = await prismaClient.roles.count({
    where: { descricao: role.descricao },
  });

  if (descricaoUsada) {
    erro.push({ field: "descricao", message: "Descricao já utilizada" });
    throw new FieldException(erro);
  }
  const data: any = {};

  if (role.descricao !== undefined) {
    data.descricao = role.descricao;
  }

  if (role.ativo !== undefined) {
    data.ativo = role.ativo;
  }

  const update = await prismaClient.roles.update({
    where: { id: role.id },
    data,
  });

  return update;
}

async function Listar(params: RoleDto) {
  const where: any = {};
  if (params.id !== undefined) {
    where.OR = [{ id: params.id }];
  }
  if (params.descricao !== undefined) {
    where.OR = where.OR = where.OR || [];
    where.OR.push({ descricao: params.descricao });
  }
  if (params.ativo !== undefined) {
    where.OR = where.OR || [];
    where.OR.push({ ativo: params.ativo });
  }

  const roles = await prismaClient.roles.findMany({
    where,
  });

  return roles;
}

export default { Inserir, Editar, Listar };
