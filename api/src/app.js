const express = require('express');
const cors = require('cors');
const registrar = require('./middleware/registrar');
const rutasEstudiantes = require('./rutas/estudiantes');
const { responderError } = require('./utilidades/responder');

const app = express();

// CORS restringido: SOLO el front autorizado (nunca cors() abierto en la entrega).
app.use(cors({ origin: process.env.FRONT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(registrar);

app.use('/estudiantes', rutasEstudiantes);

app.use((req, res) => responderError(res, 404, 'Ruta no encontrada'));

module.exports = app;
