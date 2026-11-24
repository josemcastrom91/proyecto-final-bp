// DRY: se escribe una vez y se aplica antes de todas las rutas.
function registrar(req, res, siguiente) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  siguiente();
}

module.exports = registrar;
