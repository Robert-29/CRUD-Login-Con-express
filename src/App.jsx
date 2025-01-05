import { useEffect, useState } from 'react';
import CrearAlumno from "./components/CrearAlumno.jsx";
import ActualizarAlumno from './components/ActualizarAlumno.jsx';

const TablaDatos = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [abrirPopup, setAbrirPopup] = useState(false); // Estado para controlar la apertura del popup
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null); // Estado para almacenar el alumno seleccionado

  // Recuperar/mostrar datos de la BD
  useEffect(() => {
    fetch('http://localhost:3000/alumnos') // Ajustamos la URL según el servidor Express
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

  // Recupera los detalles del alumno seleccionado
  const handleSeleccionarAlumno = (matricula) => {
    const alumno = datos.find(alumno => alumno.matricula === matricula); {/*find() busca un alumno en la lista de datos que coincida con la matrícula proporcionada. */}
    setAlumnoSeleccionado(alumno); // Almacenar el alumno seleccionado
  };

  return (
    <>
      <CrearAlumno />
      {/* Le pasamos los detalles del alumno seleccionado al popup */}
      <ActualizarAlumno 
        iniciarPopup={abrirPopup} 
        cancelarPopup={() => setAbrirPopup(false)} 
        alumnoCompleto={alumnoSeleccionado}  // Aquí pasamos el alumno completo
      />

      <div className="p-6">
        <h1 className="text-3xl font-semibold text-center mb-4">Lista de Alumnos</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Mostrar mensaje de error en pantalla si es el caso */}
        
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
                <td className="border-b p-3">
                  <div className="flex justify-center space-x-4">
                    <button onClick={() => {setAbrirPopup(true); handleSeleccionarAlumno(alumno.matricula)}} className="focus:outline-none">
                      <img src="/src/assets/svg/edit.svg" alt="Editar" className="w-5 h-5" />
                    </button>
                    <button className="focus:outline-none">
                      <img src="/src/assets/svg/delete.svg" alt="Eliminar" className="w-5 h-5" />
                    </button>
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
