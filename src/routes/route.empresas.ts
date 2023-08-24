import { Router } from "express";
import controllerEmpresa from "../controller/controller.empresa";

const routeEmpresa = Router();

routeEmpresa.post("/v1/empresa/inserir", controllerEmpresa.Inserir);
routeEmpresa.get("/v1/empresa/listar", controllerEmpresa.Listar);

export default routeEmpresa;
