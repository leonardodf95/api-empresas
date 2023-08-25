import { Router } from "express";
import controllerRoles from "../controller/controller.roles";

const routeRole = Router();

routeRole.get("/v1/role/listar", controllerRoles.Listar);
routeRole.get("/v1/role/listar/:id", controllerRoles.PesquisaPorID);
routeRole.post("/v1/role/inserir", controllerRoles.Inserir);
routeRole.put("/v1/role/editar", controllerRoles.Editar);

export default routeRole;
