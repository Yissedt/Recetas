# Sabores de Sudamérica

Sitio web estático con 100 recetas tradicionales de los 10 países de Sudamérica
(10 recetas por país), con búsqueda, filtro por país y vista de detalle.

## Cómo verlo

Abre `index.html` en cualquier navegador. No necesita servidor, base de datos
ni instalación: todo funciona en archivos locales.

## Cómo publicarlo en internet

Sube la carpeta completa (con su estructura) a cualquier hosting estático y
apunta tu dominio. Opciones gratuitas que funcionan directo:

- **Netlify** — arrastra la carpeta en netlify.com/drop
- **GitHub Pages** — sube los archivos a un repositorio y activa Pages
- **Cloudflare Pages** o **Vercel** — conecta el repositorio o sube la carpeta

## Estructura

```
index.html            Página principal
css/styles.css        Estilos
js/recetas.js         Las 100 recetas (los datos)
js/ilustraciones.js   Ilustraciones SVG y colores por país
js/app.js             Búsqueda, filtros y vista de detalle
```

## Cómo editar o agregar recetas

Las recetas viven en `js/recetas.js`. Cada una es un objeto como este:

```js
{
  id: "cl-01",                 // único: código de país + número
  pais: "Chile",               // debe coincidir con un país de la lista
  nombre: "Pastel de choclo",
  desc: "Descripción breve.",
  tiempo: 100,                 // minutos
  porciones: 6,
  dificultad: "Media",         // "Fácil", "Media" o "Alta"
  ingredientes: ["...", "..."],
  pasos: ["...", "..."],
  ilu: { t: "pastel", c: ["#EFC94C", "#B5482F", "#C98B2D"] }
}
```

Para agregar una receta, copia un objeto, edítalo y pégalo dentro del arreglo
`RECETAS`. Guarda el archivo y recarga la página: aparecerá automáticamente.

### Ilustraciones

`ilu.t` elige la plantilla del dibujo y `ilu.c` sus tres colores.
Plantillas disponibles: `plato`, `bowl`, `empanada`, `arepa`, `sandwich`,
`vaso`, `copa`, `brocheta`, `envuelto`, `pan`, `pastel`, `porcion`, `taza`,
`pescado`.

### Reemplazar una ilustración por una foto real

Agrega el campo `foto` a la receta con la ruta de la imagen:

```js
foto: "img/pastel-de-choclo.jpg",
```

Crea una carpeta `img/`, guarda ahí tus fotos, y esa receta mostrará la foto
en lugar del dibujo (en la tarjeta y en el detalle). Sin el campo `foto`,
se usa la ilustración SVG.

## Cambiar el nombre del sitio

El nombre "Sabores de Sudamérica" aparece en `index.html` (título, encabezado
y pie de página). Cámbialo ahí por el nombre definitivo cuando tengas tu dominio.
