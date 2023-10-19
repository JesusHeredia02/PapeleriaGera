import { pool } from "../db.js";

export const addSale = async (req, res) => {
    const { ID_Cliente, Fecha, Total } = req.body;
    try {
        const [data] = await pool.query('INSERT INTO Ventas (ID_Cliente, Fecha, Total) VALUES (?,?,?)', [ID_Cliente, Fecha, Total]);
        console.log(data);
        res.send({
            id: data.insertId,
            ID_Cliente,
            Fecha,
            Total
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const getSales = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Ventas");
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const getSale = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM Ventas WHERE ID_Venta=?", [req.params.id]);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const deleteSale = async (req, res) => {
    try {
        const [data] = await pool.query("DELETE FROM Ventas WHERE ID_Venta=?", [req.params.id]);
        if (data.affectedRows <= 0) {
            return res.status(404).json({
                message: "Venta no encontrada"
            });
        }
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}

export const updateSale = async (req, res) => {
    const { id } = req.params;
    const { ID_Cliente, Fecha, Total } = req.body;

    try {
        const [result] = await pool.query("UPDATE Ventas SET ID_Cliente = IFNULL(?, ID_Cliente), Fecha = IFNULL(?, Fecha), Total = IFNULL(?, Total) WHERE ID_Venta = ?", [ID_Cliente, Fecha, Total, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Venta no encontrada"
            });
        }

        const [rows] = await pool.query("SELECT * FROM Ventas WHERE ID_Venta = ?", [id]);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'Algo anda mal... favor de verificar'
        });
    }
}
