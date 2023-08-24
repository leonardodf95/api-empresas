import { Router } from "express";
import controllerRoles from "../controller/controller.roles";

const routeRole = Router();

routeRole.get("/v1/role/listar", controllerRoles.Listar);
routeRole.post("/v1/empresa/inserir", controllerRoles.Inserir);
routeRole.put("/v1/empresas/editar", controllerRoles.Editar);

export default routeRole;
