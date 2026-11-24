import { useState } from 'react';

export default function Formulario({ onGuardar }) {
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState('');

  async function enviar(evento) {
    evento.preventDefault();
    setError('');
    try {
      await onGuardar({ nombre, nota });
      setNombre('');
      setNota('');
    } catch (e) {
      setError(e.message); // mensaje que viene de la validacion del servidor
    }
  }

  return (
    <form className="formulario" onSubmit={enviar}>
      <label>
        Nombre
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Nota (0 a 5)
        <input
          type="number"
          step="0.1"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />
      </label>
      <button type="submit">Agregar estudiante</button>
      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}
