import { useEffect, useState } from 'react';
import CrearAlumno from "./components/CrearAlumno.jsx";

const TablaDatos = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos
  const [error, setError] = useState(null); // Estado para manejar errores

 
  {/*Recuperar/mostrar datos de la BD*/}
  useEffect(() => {
    fetch('http://localhost:3000/alumnos') // Ajusta la URL según tu servidor Express
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        return response.json();
      })
      .then(data => setDatos(data)) // Almacenar los datos en el estado
      .catch(err => {
        console.error(err);
        setError('Hubo un error al obtener los datos');
      });
  }, []);

  return (
    <>
    <CrearAlumno />
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center mb-4">Lista de Alumnos</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/*Mostrar mensaje de error en pantalla si es el caso*/}
      
      <table className="min-w-full table-auto border-separate border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border-b-2 p-3 text-left">Matrícula</th>
            <th className="border-b-2 p-3 text-left">Nombre</th>
            <th className="border-b-2 p-3 text-left">Apellido</th>
            <th className="border-b-2 p-3 text-left">Correo</th>
            <th className="border-b-2 p-3 text-left">Contraseña</th>
          </tr>
        </thead>
        <tbody>
          {datos.map(alumno => (
            <tr
              key={alumno.id}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="border-b p-3">{alumno.matricula}</td>
              <td className="border-b p-3">{alumno.nombre}</td>
              <td className="border-b p-3">{alumno.apellido}</td>
              <td className="border-b p-3">{alumno.correo}</td>
              <td className="border-b p-3">{alumno.contrasena}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default TablaDatos;
