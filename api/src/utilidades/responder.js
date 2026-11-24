// DRY: un solo formato de respuesta para todas las rutas.
function responder(res, codigo, datos) {
  res.status(codigo).json(datos);
}

function responderError(res, codigo, mensaje) {
  res.status(codigo).json({ error: mensaje });
}

module.exports = { responder, responderError };
