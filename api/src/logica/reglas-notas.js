// Reglas del negocio. Esta capa NO sabe que existe HTTP: sin req ni res.

// La nota minima es 3.0 por reglamento estudiantil.
// Si cambia el reglamento, cambia aqui y en ninguna otra parte.
const NOTA_MINIMA_APROBATORIA = 3.0;
const NOTA_MIN = 0;
const NOTA_MAX = 5;

function estaAprobado(nota) {
  return nota >= NOTA_MINIMA_APROBATORIA;
}

function calcularPromedio(notas) {
  if (notas.length === 0) return 0; // caso limite: lista vacia
  return notas.reduce((suma, n) => suma + n, 0) / notas.length;
}

// Devuelve { valido: true } o { valido: false, error: 'mensaje claro' }
function validarEstudiante({ nombre, nota } = {}) {
  if (typeof nombre !== 'string' || nombre.trim() === '' || nota === undefined || nota === '') {
    return { valido: false, error: 'Faltan nombre o nota' };
  }
  const n = Number(nota);
  if (Number.isNaN(n)) {
    return { valido: false, error: 'La nota debe ser un numero' };
  }
  if (n < NOTA_MIN || n > NOTA_MAX) {
    return { valido: false, error: `La nota debe estar entre ${NOTA_MIN} y ${NOTA_MAX}` };
  }
  return { valido: true };
}

// El back manda: entrega el estudiante con el estado ya resuelto.
function conEstado(estudiante) {
  return { ...estudiante, aprobado: estaAprobado(estudiante.nota) };
}

function calcularResumen(estudiantes) {
  return {
    promedio: calcularPromedio(estudiantes.map((e) => e.nota)),
    aprobados: estudiantes.filter((e) => estaAprobado(e.nota)).length,
    total: estudiantes.length,
    notaMinima: NOTA_MINIMA_APROBATORIA
  };
}

module.exports = {
  NOTA_MINIMA_APROBATORIA,
  estaAprobado,
  calcularPromedio,
  validarEstudiante,
  conEstado,
  calcularResumen
};
