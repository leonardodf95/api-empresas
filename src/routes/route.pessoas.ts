import { Router } from "express";
import controllerPessoa from "../controller/controller.pessoa";
import { isPermited } from "../middlewares/permission";

const routePessoa = Router();

routePessoa.get(
  "/v1/pessoa/listar",
  isPermited([1, 2, 3, 4]),
  controllerPessoa.Listar
);
routePessoa.get(
  "/v1/pessoa/empresa",
  isPermited([1, 2, 3, 4]),
  controllerPessoa.PesquisaPorEmpresa
);
routePessoa.get(
  "/v1/pessoa/listar/:id",
  isPermited([1, 2, 3, 4]),
  controllerPessoa.PesquisaPorID
);
routePessoa.post(
  "/v1/pessoa/inserir",
  isPermited([1, 2, 3, 4]),
  controllerPessoa.Inserir
);
routePessoa.put(
  "/v1/pessoa/editar",
  isPermited([1, 2, 3, 4, 5]),
  controllerPessoa.Editar
);

export default routePessoa;
