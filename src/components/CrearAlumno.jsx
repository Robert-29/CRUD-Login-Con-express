import { useState } from "react";

const CrearAlumno = () => {
  const [matricula, setMatricula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!nombre || !matricula) {
      setMensaje("Todos los campos son requeridos");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/nuevoalumno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ matricula, nombre, apellido, correo, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`Alumno ${data.nombre} ${data.apellido} con matricula ${data.matricula} creado exitosamente`);
        setMatricula(""); // Limpia los imput para que no tengas que borrarlo manualmente
        setNombre(""); 
        setApellido("");
        setCorreo("");
        setContrasena("");
        window.location.reload(); {/* Recargar la página para ver los cambios */}
      } else {
        setMensaje(data.error || "Hubo un error al crear el alumno");
      }
    } catch (err) {
      console.error(err);
      setMensaje("Error al crear el alumno");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Registrar Nuevo Alumno</h2>
      {mensaje && <p className="text-center text-blue-950 mb-4">{mensaje}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto ">
        <section className="flex space-x-4" >
            <div className="w-full" >
                <div>
                <label htmlFor="matricula" className="block text-lg">Matrícula</label>
                <input
                    type="number"
                    id="matricula"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                />
                </div>
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
          Registrar Alumno
        </button>
      </form>
    </div>
  );
};

export default CrearAlumno;