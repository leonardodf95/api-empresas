import { Request, Response, NextFunction } from "express";
import FieldException from "../exceptions/fieldException";

function empresaScopeCheck() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role, id_empresa } = req.usuario;

    let idComparacao;
    if (Object.keys(req.params).length !== 0) {
      idComparacao = req.params.id;
    } else if (Object.keys(req.query).length !== 0) {
      idComparacao = req.query.id;
    }

    if (
      role !== 1 &&
      Number(idComparacao) !== id_empresa &&
      idComparacao !== undefined
    ) {
      const error = [
        {
          field: "empresa",
          message: "Empresa fora do escopo do usuário!",
        },
      ];
      throw new FieldException(error);
    }

    next();
  };
}

export default { empresaScopeCheck };
