# Registro de notas

API en Node/Express y front en React que registran estudiantes y calculan promedio y aprobados.

## Integrantes
- Nombre Apellido 1 — (de que se encargo)
- Nombre Apellido 2 — (de que se encargo)
- Nombre Apellido 3 — (de que se encargo)

## Tecnologias
React (Vite), Node, Express, Vitest, AWS S3 y EC2.

## Como levantarlo en local
```
git clone <url>
cd proyecto/api   && cp .env.example .env && npm install && npm run dev
cd proyecto/front && npm install && npm run dev
```
Variables de entorno:
- `api/.env`: `PORT` (3000) y `FRONT_URL` (origen permitido por CORS; local: http://localhost:5173).
- `front/.env.development` / `front/.env.production`: `VITE_API_URL` (direccion de la API). Plantilla en `front/.env.example`.

## Endpoints de la API
| Metodo | Ruta | Que hace | Respuesta |
|---|---|---|---|
| GET | /estudiantes | Lista todos los estudiantes (con `aprobado` ya calculado) | 200 · arreglo |
| GET | /estudiantes/resumen | Promedio, aprobados, total y nota minima | 200 · objeto |
| POST | /estudiantes | Agrega uno. Requiere `nombre` y `nota` (0 a 5) | 201 · el creado / 400 · datos invalidos |

## Como correr las pruebas
```
cd api && npm test
```

## Despliegue
- Front: `npm run build` en `front/` y subir el contenido de `dist/` al bucket S3 (URL: ...).
- API: EC2 (IP: ...), Security Group con una sola regla de entrada (puerto 3000), CORS restringido al bucket.
- Pasos para redesplegar: ver la guia de la Unidad 3, seccion 3.5.

## Seguridad: npm audit
- api: (pegar aqui lo que reporto `npm audit` y que se decidio).
- front: (pegar aqui lo que reporto `npm audit` y que se decidio).

## DRY
La nota minima (3.0) vive solo en `api/src/logica/reglas-notas.js`. El back devuelve `aprobado` ya resuelto y el front solo lo muestra.
