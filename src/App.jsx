import { useEffect, useState } from "react";
import CrearAlumno from "./components/CrearAlumno.jsx";
import ActualizarAlumno from "./components/ActualizarAlumno.jsx";
import EliminarAlumno from "./components/EliminarAlumno.jsx";

const TablaDatos = () => {
  const [datos, setDatos] = useState([]); // Almacena los datos de los alumnos
  const [error, setError] = useState(null);
  const [abrirPopup, setAbrirPopup] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null); // Almacena el alumno seleccionado

  useEffect(() => {
    fetch("http://localhost:3000/alumnos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        return response.json();
      })
      .then((data) => setDatos(data))
      .catch((err) => {
        console.error(err);
        setError("Hubo un error al obtener los datos");
      });
  }, []);

  const handleSeleccionarAlumno = (matricula) => {
    const alumno = datos.find((alumno) => alumno.matricula === matricula); // Busca el alumno por matrícula
    setAlumnoSeleccionado(alumno);
  };

  return (
    <>
      <CrearAlumno />
      <ActualizarAlumno
        iniciarPopup={abrirPopup}
        cancelarPopup={() => setAbrirPopup(false)}
        alumnoCompleto={alumnoSeleccionado} // pasamos el alumno completo (nombre, apellido, correo, contrasena)
      />

      <div className="p-6">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Lista de Alumnos
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <table className="min-w-full table-auto border-separate border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border-b-2 p-3 text-left">Matrícula</th>
              <th className="border-b-2 p-3 text-left">Nombre</th>
              <th className="border-b-2 p-3 text-left">Apellido</th>
              <th className="border-b-2 p-3 text-left">Correo</th>
              <th className="border-b-2 p-3 text-left">Contraseña</th>
              <th className="border-b-2 p-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((alumno) => (
              <tr
                key={alumno.matricula}
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="border-b p-3">{alumno.matricula}</td>
                <td className="border-b p-3">{alumno.nombre}</td>
                <td className="border-b p-3">{alumno.apellido}</td>
                <td className="border-b p-3">{alumno.correo}</td>
                <td className="border-b p-3">{alumno.contrasena}</td>
                <td className="border-b p-3">
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setAbrirPopup(true);
                        handleSeleccionarAlumno(alumno.matricula);
                      }}
                      className="focus:outline-none"
                    >
                      <img
                        src="/src/assets/svg/edit.svg"
                        alt="Editar"
                        className="w-5 h-5"
                      />
                    </button>
                    <EliminarAlumno alumnoCompleto={alumno} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablaDatos;