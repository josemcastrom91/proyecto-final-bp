// La direccion de la API vive aqui, una sola vez.
const BASE = import.meta.env.VITE_API_URL;

async function pedir(ruta, opciones) {
  const respuesta = await fetch(`${BASE}${ruta}`, opciones);
  const datos = await respuesta.json();
  if (!respuesta.ok) throw new Error(datos.error || 'Error inesperado');
  return datos;
}

export const obtenerEstudiantes = () => pedir('/estudiantes');
export const obtenerResumen = () => pedir('/estudiantes/resumen');
export const crearEstudiante = (estudiante) =>
  pedir('/estudiantes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estudiante)
  });
