import { Router } from "express";
import routeEmpresa from "./route.empresas";
import routeRole from "./route.roles";
import routePessoa from "./route.pessoas";
import routeLogin from "./route.login";

const routes = Router();

routes.use(routeLogin);
routes.use(routeEmpresa);
routes.use(routeRole);
routes.use(routePessoa);

export default routes;
