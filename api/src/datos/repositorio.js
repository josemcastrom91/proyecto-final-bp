// De donde salen y donde se guardan los datos (en memoria para el proyecto).
let siguienteId = 3;
const estudiantes = [
  { id: 1, nombre: 'Ana', nota: 4.5 },
  { id: 2, nombre: 'Luis', nota: 2.8 }
];

async function listar() {
  return [...estudiantes];
}

async function agregar({ nombre, nota }) {
  const nuevo = { id: siguienteId++, nombre: nombre.trim(), nota: Number(nota) };
  estudiantes.push(nuevo);
  return nuevo;
}

module.exports = { listar, agregar };
