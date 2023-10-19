import { pool } from "../db.js";

export const addClient = async (req, res) => {
    const { Nombre, Apellido, Direccion, Telefono } = req.body;
    try {
        const [data] = await pool.query('INSERT INTO Clientes (Nombre, Apellido, Direccion, Telefono) VALUES (?,?,?,?)', [Nombre, Apellido, Direccion, Telefono]);
        console.log(data);
        res.send({
            id: data.insertId,
            Nombre,
            Apellido,
            Direccion,
            Telefono
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const getClients = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM `Clientes`");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const getClient = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Clientes WHERE ID_Cliente=?", [req.params.id]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const deleteClient = async (req, res) => {
    try {
        const [data] = await pool.query("DELETE FROM Clientes WHERE ID_Cliente=?", [req.params.id]);
        if (data.affectedRows <= 0) {
            return res.status(404).json({
                message: "Cliente no encontrado"
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

export const updateClient = async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Direccion, Telefono } = req.body;

    try {
        const [result] = await pool.query("UPDATE Clientes SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido), Direccion = IFNULL(?, Direccion), Telefono = IFNULL(?, Telefono) WHERE ID_Cliente = ?", [Nombre, Apellido, Direccion, Telefono, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        const [rows] = await pool.query("SELECT * FROM Clientes WHERE ID_Cliente = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}
