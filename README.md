# Sabores del Mundo

Sitio web estático con 160 recetas tradicionales de 16 países (10 por país),
con búsqueda, filtros por país, tipo y dificultad, mapa interactivo,
porciones ajustables y vista de detalle.

Países: Argentina, Bolivia, Brasil, Chile, Colombia, Ecuador, Paraguay, Perú,
Uruguay, Venezuela, México, España, Italia, Francia, China y Japón.

## Cómo verlo

Abre `index.html` en cualquier navegador. No necesita servidor ni instalación.

## Cómo actualizar tu sitio en GitHub Pages

Todos los archivos van **sueltos en la raíz** del repositorio (sin carpetas),
igual que tu repositorio actual. Para actualizar:

1. En tu repositorio, ve a **Add file → Upload files**.
2. Arrastra los 6 archivos: `index.html`, `styles.css`, `recetas.js`,
   `ilustraciones.js`, `app.js` y `README.md`.
3. **Commit changes**. GitHub reemplaza los archivos antiguos automáticamente.
4. Espera 1–2 minutos y recarga el sitio con Ctrl+Shift+R.

## Estructura

```
index.html        Página principal
styles.css        Estilos
recetas.js        Las 160 recetas (los datos)
ilustraciones.js  Ilustraciones SVG y colores por país
app.js            Búsqueda, filtros, mapa, porciones y vista de detalle
```

## Cómo editar o agregar recetas

Las recetas viven en `recetas.js`. Cada una es un objeto como este:

```js
{
  id: "cl-01",                  // único: código de país + número
  pais: "Chile",                // debe coincidir con un país de la lista
  nombre: "Pastel de choclo",
  desc: "Descripción breve.",
  tiempo: 100,                  // minutos (no cambia con las porciones)
  porciones: 6,                 // porciones base; el visitante puede ajustarlas
  dificultad: "Media",          // "Fácil", "Media" o "Alta" (texto)
  tipo: ["comida"],             // "comida", "bebida", "postre" — puede tener varios
  nivel: 3,                     // dificultad en estrellas, de 1 a 5
  ingredientes: ["500 g de…"],  // los números se escalan según las porciones
  pasos: ["...", "..."],
  ilu: { t: "pastel", c: ["#EFC94C", "#B5482F", "#C98B2D"] }
}
```

Notas sobre el escalado de porciones: el sitio multiplica los números de los
ingredientes automáticamente. No toca medidas de tamaño o temperatura
(`cm`, `°C`) ni dimensiones (`1x6`). Los ingredientes sin número
("Sal y pimienta") se muestran tal cual.

### Tipos con doble categoría

Una receta puede pertenecer a más de un tipo, por ejemplo el mote con
huesillo: `tipo: ["bebida","postre"]`. La insignia mostrará "Bebida · Postre"
y aparecerá en ambos filtros.

### Ilustraciones

`ilu.t` elige la plantilla y `ilu.c` sus tres colores. Plantillas: `plato`,
`bowl`, `empanada`, `arepa`, `sandwich`, `vaso`, `copa`, `brocheta`,
`envuelto`, `pan`, `pastel`, `porcion`, `taza`, `pescado`.

Para usar una foto real en una receta, agrégale el campo
`foto: "img/mi-foto.jpg"` y sube la imagen a una carpeta `img/` en el
repositorio: la foto reemplaza automáticamente al dibujo.

## Agregar un país nuevo

1. En `ilustraciones.js`, agrega el país con su color al objeto `PAISES`.
2. En `app.js`, agrega su posición en el mapa al objeto `MAPA_POS`
   (coordenadas x, y dentro del lienzo de 1000×430).
3. En `recetas.js`, agrega sus recetas con `pais` exactamente igual al nombre
   registrado en `PAISES`.

## Cambiar el nombre del sitio

"Sabores del Mundo" aparece en `index.html` (título, encabezado y pie).
