import { Router } from "express";
import controllerEmpresa from "../controller/controller.empresa";
import { isPermited } from "../middlewares/permission";
import validationScope from "../validations/validationScope";

const routeEmpresa = Router();

routeEmpresa.get(
  "/v1/empresa/listar",
  isPermited([1, 2, 3, 4, 5]),
  validationScope.empresaScopeCheck(),
  controllerEmpresa.Listar
);
routeEmpresa.get(
  "/v1/empresa/listar/:id",
  isPermited([1, 2, 3, 4, 5]),
  validationScope.empresaScopeCheck(),
  controllerEmpresa.PesquisaPorID
);
routeEmpresa.post(
  "/v1/empresa/inserir",
  isPermited([1]),
  validationScope.empresaScopeCheck(),
  controllerEmpresa.Inserir
);
routeEmpresa.put(
  "/v1/empresa/editar",
  isPermited([1, 2]),
  validationScope.empresaScopeCheck(),
  controllerEmpresa.Editar
);

export default routeEmpresa;
