import { createPool } from "mysql2/promise";

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'robert.29.2005',
    port: 3306,
    database: 'usuarios'
});

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Conexión exitosa a la base de datos MySQL");
        connection.release(); // Liberar conexión
    } catch (err) {
        console.error("Error al conectar al pool de la base de datos:", err);
    }
})();

export default pool;