# Tonerink — frontend

Sitio de Tonerink S.A.S construido con **React 19 + Vite + TypeScript**, usando
**Tamagui** para los carruseles, formularios y el resto de la interfaz.

## Requisitos

- Node 22+
- pnpm

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

La API (`https://api.tonerinksas.com`) no habilita CORS para `localhost`, así que
en desarrollo las peticiones salen por el proxy `/api` que define `vite.config.ts`.
En producción nginx también sirve `/api`, reenviando las solicitudes al backend
sin el prefijo. Así se evita depender de CORS para cada dominio del sitio.
Para apuntar a otro backend, copia `.env.example` a `.env` y define
`VITE_API_BASE` antes de compilar; una URL externa requiere CORS en ese backend.

## Scripts

| Script           | Qué hace                                      |
| ---------------- | --------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo con HMR                |
| `pnpm build`     | Chequeo de tipos + build de producción a `dist/` |
| `pnpm preview`   | Sirve `dist/` localmente                      |
| `pnpm typecheck` | Solo chequeo de tipos                         |

## Rutas

| Ruta        | Página                                               |
| ----------- | ---------------------------------------------------- |
| `/`         | Portada: categorías, marcas y propuesta de valor     |
| `/catalogo` | Catálogo con filtros por categoría y buscador        |
| `/login`    | Acceso de administrador                              |
| `/admin`    | ABM de productos (requiere token)                    |

## Estructura

```
src/
  api/          cliente HTTP y URLs del backend
  components/   componentes de UI (carrusel, tarjetas, formularios…)
    ui/         primitivas Tamagui compartidas
  context/      sesión del administrador
  data/         árbol de categorías del catálogo
  hooks/        datos de productos y paginación del carrusel
  pages/        una por ruta
  styles/       CSS global (reset y animación del carrusel de marcas)
  tamagui.config.ts
public/imgs/    imágenes del sitio
```

## Despliegue

### Render (Static Site)

`render.yaml` define el sitio estático y las reglas de reescritura. Para un sitio
existente creado desde el dashboard, añadir estas reglas en **Redirects/Rewrites**,
en este orden (subir el archivo no modifica automáticamente un sitio que no esté
gestionado mediante Blueprint):

| Source | Destination | Action |
| ------ | ----------- | ------ |
| `/api/*` | `https://api.tonerinksas.com/*` | Rewrite |
| `/*` | `/index.html` | Rewrite |

La regla de API debe ir antes de la de React. Sin ella, `/api/product/get` devuelve
HTML en lugar de JSON. Dejar `VITE_API_BASE` sin definir para usar `/api`.
El build es `pnpm install --frozen-lockfile && pnpm build` y el directorio publicado
es `dist`. nginx solo se ejecuta con el despliegue Docker descrito a continuación.

### Docker / Kubernetes

`Dockerfile` compila el proyecto y sirve `dist/` con nginx, que reenvía `/api/`
a `https://api.tonerinksas.com/` y redirige
cualquier ruta desconocida a `index.html` para que React Router la resuelva.

```bash
docker compose up --build
```
