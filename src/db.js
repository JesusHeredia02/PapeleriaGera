import { createPool } from "mysql2/promise";
//realizar conexion a la base d edatos creada
export const pool=createPool({
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database:"PapeleriaDB"
})