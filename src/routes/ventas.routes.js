import { pool } from "../db.js";

import { addSale, getSale, getSales,deleteSale, updateSale } from "../controllers/ventas.controllers.js";

import { Router } from "express";

const ventasRouter = Router();
ventasRouter.get("/ventas", getSales);

ventasRouter.get("/venta/:id", getSale);

ventasRouter.post("/nuevaVenta", addSale);

ventasRouter.put("/venta", (req, res) => {
  res.send("Venta Actualizada");
});

ventasRouter.delete('/deletVenta/:id',deleteSale);
ventasRouter.patch('/updateVenta/:id',updateSale);
export default ventasRouter;