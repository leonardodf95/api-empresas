import { Router } from "express";
import routeEmpresa from "./route.empresas";

const routes = Router();

routes.use(routeEmpresa);

export default routes;
