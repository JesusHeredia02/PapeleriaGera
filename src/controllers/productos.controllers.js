import { pool } from "../db.js";

export const addProduct = async (req, res) => {
    const { Nombre, Descripcion, Precio, Stock } = req.body;
    try {
        const [data] = await pool.query('INSERT INTO Productos (Nombre, Descripcion, Precio, Stock) VALUES (?,?,?,?)', [Nombre, Descripcion, Precio, Stock]);
        console.log(data);
        res.send({
            id: data.insertId,
            Nombre,
            Descripcion,
            Precio,
            Stock
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const getProducts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Productos");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const getProduct = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Productos WHERE ID_Producto=?", [req.params.id]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const [data] = await pool.query("DELETE FROM Productos WHERE ID_Producto=?", [req.params.id]);
        if (data.affectedRows <= 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }
        res.sendStatus(204);
    } catch (error) {
        // Manejo del error, puedes agregar un mensaje de error personalizado si lo deseas.
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion, Precio, Stock } = req.body;

    try {
        const [result] = await pool.query("UPDATE Productos SET Nombre = IFNULL(?, Nombre), Descripcion = IFNULL(?, Descripcion), Precio = IFNULL(?, Precio), Stock = IFNULL(?, Stock) WHERE ID_Producto = ?", [Nombre, Descripcion, Precio, Stock, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Producto no encontrado"
            });
        }

        const [rows] = await pool.query("SELECT * FROM Productos WHERE ID_Producto = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}
