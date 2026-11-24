import { useEffect, useState } from 'react';
import { obtenerEstudiantes, obtenerResumen, crearEstudiante } from './api';
import Tarjeta from './components/Tarjeta';
import FilaEstudiante from './components/FilaEstudiante';
import Formulario from './components/Formulario';

export default function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [errorCarga, setErrorCarga] = useState('');

  async function cargar() {
    try {
      const [lista, res] = await Promise.all([obtenerEstudiantes(), obtenerResumen()]);
      setEstudiantes(lista);
      setResumen(res);
      setErrorCarga('');
    } catch (e) {
      setErrorCarga('No se pudo conectar con la API. Revisa que este encendida.');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  async function guardar(datos) {
    await crearEstudiante(datos); // si el servidor rechaza, el error sube al formulario
    await cargar();
  }

  return (
    <main>
      <h1>Registro de notas</h1>

      {errorCarga && <p className="error" role="alert">{errorCarga}</p>}

      {resumen && (
        <section className="resumen">
          <Tarjeta titulo="Promedio" valor={resumen.promedio.toFixed(2)} />
          <Tarjeta
            titulo="Aprobados"
            valor={resumen.aprobados}
            detalle={`nota minima ${resumen.notaMinima.toFixed(1)}`}
          />
          <Tarjeta titulo="Estudiantes" valor={resumen.total} />
        </section>
      )}

      <table>
        <thead>
          <tr><th>Nombre</th><th className="num">Nota</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {estudiantes.map((e) => (
            <FilaEstudiante key={e.id} nombre={e.nombre} nota={e.nota} aprobado={e.aprobado} />
          ))}
        </tbody>
      </table>

      <Formulario onGuardar={guardar} />
    </main>
  );
}
