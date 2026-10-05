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
En producción se llama a la API directamente. Para apuntar a otro backend, copia
`.env.example` a `.env` y define `VITE_API_BASE`.

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

`Dockerfile` compila el proyecto y sirve `dist/` con nginx, que redirige
cualquier ruta desconocida a `index.html` para que React Router la resuelva.

```bash
docker compose up --build
```
