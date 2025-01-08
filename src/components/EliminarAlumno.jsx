import PropTypes from 'prop-types';  
import { useState, useEffect } from 'react';

const EliminarAlumno = ({ alumnoCompleto }) => {
  const [error, setError] = useState(null);
  const [matricula, setMatricula] = useState("");

  useEffect(() => {
    setMatricula(alumnoCompleto.matricula);
  }, [alumnoCompleto]);

  const handleEliminarAlumno = async () => {
    const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar al alumno con matrícula ${alumnoCompleto.matricula}?`);
    if (!confirmacion) return; //esto hace que si el usuario da cancelar no se ejecute el código de abajo

    try {
      const response = await fetch(`http://localhost:3000/eliminaralumno/${matricula}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const result = await response.json();
        alert(result.message || 'Alumno eliminado correctamente');
        window.location.reload();
      } else {
        setError('Error al eliminar el alumno.');
      }
    } catch (error) {
      setError(`Ocurrió un error al eliminar el alumno: ${error.message}`);
    }
  };

  return (
    <>
      <button onClick={handleEliminarAlumno} className="focus:outline-none">
        <img src="/src/assets/svg/delete.svg" alt="Eliminar" className="w-5 h-5" />
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
};

EliminarAlumno.propTypes = {
    alumnoCompleto: PropTypes.shape({
      matricula: PropTypes.string,
    }),
  };
  

export default EliminarAlumno;