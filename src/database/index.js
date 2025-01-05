import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());  // Middleware para procesar JSON

app.get('/alumnos', async (req, res) => {
    try {
        const [alumnos] = await pool.query("SELECT * FROM alumnos"); 
        res.json(alumnos); 
    } catch (err) {
        console.error("Error al consultar la tabla `alumnos`:", err);
        res.status(500).json({ error: "Error al obtener los datos de la tabla `alumnos`" });
    }
});

// Ruta para crear un nuevo alumno
app.post("/nuevoalumno", async (req, res) => {
    const { matricula, nombre, apellido, correo, contrasena } = req.body;

    if (!nombre || !matricula || !apellido || !correo || !contrasena) {
        return res.status(400).json({ error: "Los campos nombre y matricula son requeridos " });
    }

    try {
        const [result] = await pool.query("INSERT INTO alumnos (matricula, nombre, apellido, correo, contrasena) VALUES (?, ?, ?, ?, ?)", [
            matricula, nombre, apellido, correo, contrasena
        ]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }
        
        res.status(201).json({ nombre, matricula });
    } catch (err) {
        console.error("Error al insertar el alumno:", err);
        res.status(500).send("Error al insertar el alumno ");
    }
});

// Ruta para actualizar un alumno
app.put("/actualizaralumno/:matricula", async (req, res) => {
    const { matricula } = req.params; // Obtener la matrícula de los parámetros de la URL
    const { nombre, apellido, correo, contrasena } = req.body; // Obtener el nuevo nombre del cuerpo de la solicitud

    if (!nombre || !apellido || !correo || !contrasena) {
        return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    try {
        // Realizar la actualización en la base de datos
        const [result] = await pool.query(
            "UPDATE alumnos SET nombre = ?, apellido = ?, correo = ?, contrasena = ? WHERE matricula = ?",
            [nombre, apellido, correo, contrasena, matricula]
        );

        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        res.status(200).json({ mensaje: "Alumno actualizado correctamente" });
    } catch (err) {
        console.error("Error al actualizar el alumno:", err);
        res.status(500).send("Error al actualizar el alumno");
    }
});

app.delete("/eliminaralumno/:matricula", async (req, res) => {
    const { matricula } = req.params; // Obtener la matrícula desde los parámetros de la URL

    try {
        // Ejecutar la consulta DELETE
        const [result] = await pool.query(
            "DELETE FROM alumnos WHERE matricula = ?", 
            [matricula]
        );

        // Verificar si se eliminó algún registro
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        res.status(200).json({ mensaje: "Alumno eliminado correctamente" });
    } catch (err) {
        console.error("Error al eliminar el alumno:", err);
        res.status(500).send("Error al eliminar el alumno");
    }
});

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});