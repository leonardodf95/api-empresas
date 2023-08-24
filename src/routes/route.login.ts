import { Router } from "express";
import controllerLogin from "../controller/controller.login";

const routeLogin = Router();

routeLogin.post("/v1/login/inserir", controllerLogin.Inserir);
routeLogin.put("/v1/login/editar", controllerLogin.Editar);

export default routeLogin;
