import express from "express";
import productoRouter from "./routes/productos.routes.js"
import clienteRouter from "./routes/clientes.routes.js"
import ventasRouter from "./routes/ventas.routes.js"
import cors from 'cors'
import './config.js'
//import connectionRouter from "./routes/connection.routes.js"

const app = express();





app.use(express.json())
app.use(cors());
app.use('/api',productoRouter)
app.use('/api',clienteRouter)
app.use(cors())
app.use('/api',ventasRouter)
export default app;