// Esta capa solo recibe y responde. La logica vive en ../logica
const express = require('express');
const repositorio = require('../datos/repositorio');
const { validarEstudiante, conEstado, calcularResumen } = require('../logica/reglas-notas');
const { responder, responderError } = require('../utilidades/responder');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const lista = await repositorio.listar();
    responder(res, 200, lista.map(conEstado));
  } catch (error) {
    responderError(res, 500, 'No se pudo leer la lista');
  }
});

router.get('/resumen', async (req, res) => {
  try {
    responder(res, 200, calcularResumen(await repositorio.listar()));
  } catch (error) {
    responderError(res, 500, 'No se pudo calcular el resumen');
  }
});

router.post('/', async (req, res) => {
  const resultado = validarEstudiante(req.body);
  if (!resultado.valido) {
    return responderError(res, 400, resultado.error);
  }
  try {
    const nuevo = await repositorio.agregar(req.body);
    responder(res, 201, conEstado(nuevo));
  } catch (error) {
    responderError(res, 500, 'No se pudo guardar el estudiante');
  }
});

module.exports = router;
