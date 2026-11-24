# Registro de notas

API en Node/Express y front en React que registran estudiantes, calculan el promedio del grupo y cuántos aprobaron. Hecho para el curso de Buenas Prácticas de Desarrollo de Software (CUC).

## Integrantes
- José Miguel Castro — trabajo individual: back-end en Node/Express, front-end en React, pruebas con Vitest, control de versiones (ramas y Pull Requests), documentación y despliegue en AWS.

## Tecnologías
React 18 con Vite, Node.js, Express, Vitest, AWS S3 (front) y AWS EC2 (API).

## Estructura del proyecto
```
proyecto/
  api/
    src/
      servidor.js             levanta Express
      app.js                  configura CORS, JSON y rutas
      rutas/estudiantes.js    solo recibe y responde
      logica/reglas-notas.js  reglas del negocio, sin req ni res
      datos/repositorio.js    de donde salen y donde se guardan los datos
      middleware/registrar.js registro de peticiones
      utilidades/responder.js formato de respuesta compartido
  front/
    src/
      api.js                  única ubicación de la dirección de la API
      components/             Tarjeta, FilaEstudiante, Formulario
      App.jsx
```

## Cómo levantarlo en local
```
git clone https://github.com/josemcastrom91/proyecto-final-bp.git
cd proyecto-final-bp/api
copy .env.example .env
npm install
npm run dev
```
En otra terminal:
```
cd proyecto-final-bp/front
npm install
npm run dev
```
La API queda en http://localhost:3000 y el front en http://localhost:5173.

Variables de entorno:
- `api/.env`: `PORT` (puerto de la API, 3000) y `FRONT_URL` (único origen que permite CORS; en local http://localhost:5173, en producción la URL del bucket S3). Plantilla en `api/.env.example`.
- `front/.env.development` y `front/.env.production`: `VITE_API_URL` (dirección de la API). Plantilla en `front/.env.example`. El `.env.production` no se sube a Git.

## Endpoints de la API
| Método | Ruta | Qué hace | Respuesta |
|---|---|---|---|
| GET | /estudiantes | Lista todos los estudiantes, cada uno con `aprobado` ya calculado | 200 · arreglo |
| GET | /estudiantes/resumen | Promedio, aprobados, total y nota mínima | 200 · objeto |
| POST | /estudiantes | Agrega uno. Requiere `nombre` y `nota` (entre 0 y 5) | 201 · el creado / 400 · datos inválidos con mensaje |

Cualquier otra ruta responde 404.

## Cómo correr las pruebas
```
cd api
npm test
```
Son 13 pruebas sobre las reglas del negocio (`api/src/logica/reglas-notas.test.js`), incluidos casos límite: la nota exacta de 3.0, lista vacía, notas frontera 0 y 5 y datos inválidos. Para comprobar que las pruebas sirven, se cambió a propósito `>=` por `>` en `estaAprobado` y las pruebas fallaron; al devolver el `>=` volvieron a pasar.

## Despliegue
- Front: `npm run build` en `front/` y se sube el contenido de `dist/` al bucket S3 con hosting estático. URL: http://cuc-bp-jmcastro-sitio.s3-website-us-east-1.amazonaws.com
- API: instancia EC2 (Ubuntu, t3.micro) que clona la rama `main` y corre como servicio de systemd en el puerto 3000. La instancia se terminó después de las pruebas para no gastar presupuesto del laboratorio, por eso la API ya no responde desde internet.
- Security Group con una sola regla de entrada: TCP 3000. SSH cerrado.
- CORS restringido a la URL del bucket mediante `FRONT_URL`.
- Un segundo bucket privado (`cuc-bp-jmcastro-privado`) responde 403 a cualquier acceso externo.
- Para volver a desplegar: lanzar una instancia con el mismo user data, poner la nueva IP en `front/.env.production` (`VITE_API_URL=http://IP:3000`), repetir `npm run build` y volver a subir el contenido de `dist/` al bucket.
- Al terminar las pruebas, los recursos se cierran: instancia terminada y sin Elastic IP reservada.

## DRY
| Regla repetida | Dónde vive ahora | Archivos a tocar si cambia |
|---|---|---|
| Nota mínima aprobatoria (3.0) | `api/src/logica/reglas-notas.js`; el back devuelve `aprobado` y el front solo lo muestra | 1 |
| Dirección de la API | `front/.env.*`, leída una sola vez en `front/src/api.js` | 1 |
| Formato de respuesta HTTP | `api/src/utilidades/responder.js` | 1 |
| Tarjeta del resumen | `front/src/components/Tarjeta.jsx`, usada 3 veces | 1 |
| Registro de peticiones | `api/src/middleware/registrar.js`, aplicado a todas las rutas | 1 |

## Seguridad
- Validación en el servidor: el POST valida nombre, nota numérica y rango 0 a 5, y responde 400 con un mensaje claro.
- Secretos fuera de Git: `.env` y `.env.production` están en `.gitignore`; el repositorio solo trae `.env.example`.
- CORS restringido a un único origen.
- Security Group mínimo: solo el puerto de la API, sin SSH.
- `npm audit`:
  - Audit completo (`api` y `front`): 6 vulnerabilidades (3 moderate, 1 high, 2 critical), todas en dependencias de desarrollo (vitest, vite, esbuild, tinypool) que no se incluyen en el código que se publica.
  - `npm audit --omit=dev` (solo lo que va a producción): 0 vulnerabilidades, tanto en `api` como en `front`.
  - Decisión: no se aplica `npm audit fix --force` porque instala versiones con cambios incompatibles que podrían romper las pruebas. Queda para una actualización planificada de vitest y vite.