import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // PropTypes (Estudiar este tema!!!) se colocan hasta el final del archivo 

const ActualizarAlumno = ({ iniciarPopup, cancelarPopup, alumnoCompleto }) => {
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  useEffect(() => {
    if (alumnoCompleto) {
      setMatricula(alumnoCompleto.matricula);
      setNombre(alumnoCompleto.nombre);
      setApellido(alumnoCompleto.apellido);
      setCorreo(alumnoCompleto.correo);
      setContrasena(alumnoCompleto.contrasena);
    }
  }, [alumnoCompleto]);

  if (!iniciarPopup) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto con los datos del formulario
    const alumno = {
      matricula,
      nombre,
      apellido,
      correo,
      contrasena
    };

    try {
      // Hacer la petición PUT al backend
      const response = await fetch(`http://localhost:3000/actualizaralumno/${matricula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumno),
      });

      if (response.ok) {
        alert('Alumno actualizado correctamente');
        window.location.reload(); {/* Recargar la página para ver los cambios */}
      } else {
        alert('Error al actualizar el alumno');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectarse con el servidor');
    }
  };

  return (
    <div className="fixed inset-0  bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className='bg-gray-100 p-6 flex flex-col' >
        <button onClick={cancelarPopup} className="text-red-500  font-bold text-lg ml-auto"> 
          ✖
        </button>
        <div>
          <h1 className='font-semibold text-2xl' >Actualizar alumno</h1>
          <h1>Matrícula: {matricula}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <section className="flex space-x-4" >
                <div className="w-full" >
                    <div>
                    <label htmlFor="nombre" className="block text-lg">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                    <div>
                    <label htmlFor="apellido" className="block text-lg">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                </div>
                <div className="w-full" >
                    <div >
                    <label htmlFor="correo" className="block text-lg">Correo</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                    <div>
                    <label htmlFor="contrasena" className="block text-lg">Contraseña</label>
                    <input
                        type="text"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    </div>
                </div>
            </section>   
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Actualizar alumno
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
};
//Esto es para que no se rompa la aplicación si no se pasan las props correctas
//Proto typs
ActualizarAlumno.propTypes = {
  iniciarPopup: PropTypes.bool.isRequired,
  cancelarPopup: PropTypes.func.isRequired,
  alumnoCompleto: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ActualizarAlumno;