import { Router } from "express";
import controllerEmpresa from "../controller/controller.empresa";

const routeEmpresa = Router();

routeEmpresa.get("/v1/empresa/listar", controllerEmpresa.Listar);
routeEmpresa.get("/v1/empresa/listar/:id", controllerEmpresa.PesquisaPorID);
routeEmpresa.post("/v1/empresa/inserir", controllerEmpresa.Inserir);
routeEmpresa.put("/v1/empresa/editar", controllerEmpresa.Editar);

export default routeEmpresa;
