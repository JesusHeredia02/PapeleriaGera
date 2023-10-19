import { pool } from "../db.js";

import { addClient, getClient, getClients,deleteClient, updateClient } from "../controllers/clientes.controllers.js";

import { Router } from "express";

const clienteRouter = Router();
clienteRouter.get("/clientes", getClients);

clienteRouter.get("/cliente/:id", getClient);

clienteRouter.post("/nuevoCliente", addClient);

clienteRouter.put("/cliente", (req, res) => {
  res.send("Cliente Actualizado");
});

clienteRouter.delete('/deletCliente/:id',deleteClient);
clienteRouter.patch('/updateCliente/:id',updateClient);
export default clienteRouter;
