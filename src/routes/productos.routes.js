import { pool } from "../db.js";

import { addProduct, getProduct, getProducts,deleteProduct, updateProduct } from "../controllers/productos.controllers.js";

import { Router } from "express";

const productoRouter = Router();

productoRouter.get("/productos", getProducts);

productoRouter.get("/producto/:id", getProduct);

productoRouter.post("/nuevoProducto", addProduct);

productoRouter.put("/producto", (req, res) => {
  res.send("Producto actualizado");
});

productoRouter.delete('/deletProducto/:id',deleteProduct);
productoRouter.patch('/updateProducto/:id',updateProduct);
export default productoRouter;