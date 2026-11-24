// El estado "aprobado" viene resuelto del back: aqui no existe la regla del 3.0.
export default function FilaEstudiante({ nombre, nota, aprobado }) {
  return (
    <tr>
      <td>{nombre}</td>
      <td className="num">{nota.toFixed(1)}</td>
      <td className={aprobado ? 'estado ok' : 'estado no'}>
        {aprobado ? 'Aprobado' : 'Reprobado'}
      </td>
    </tr>
  );
}
