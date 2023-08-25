import { Router } from "express";
import controllerPessoa from "../controller/controller.pessoa";

const routePessoa = Router();

routePessoa.get("/v1/pessoa/listar", controllerPessoa.Listar);
routePessoa.get("/v1/pessoa/listar/:id", controllerPessoa.PesquisaPorID);
routePessoa.post("/v1/pessoa/inserir", controllerPessoa.Inserir);
routePessoa.put("/v1/pessoa/editar", controllerPessoa.Editar);

export default routePessoa;
