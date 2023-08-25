import { Router } from "express";
import controllerEmpresa from "../controller/controller.empresa";
import { isPermited } from "../middlewares/permission";

const routeEmpresa = Router();

routeEmpresa.get(
  "/v1/empresa/listar",
  isPermited([1, 2]),
  controllerEmpresa.Listar
);
routeEmpresa.get("/v1/empresa/listar/:id", controllerEmpresa.PesquisaPorID);
routeEmpresa.post("/v1/empresa/inserir", controllerEmpresa.Inserir);
routeEmpresa.put("/v1/empresa/editar", controllerEmpresa.Editar);

export default routeEmpresa;
