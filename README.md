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
2. Arrastra los 6 archivos (`index.html`, `styles.css`, `recetas.js`,
   `ilustraciones.js`, `app.js`, `README.md`) **y también la carpeta `img`
   completa** (GitHub conserva las carpetas al arrastrarlas).
3. **Commit changes**. GitHub reemplaza los archivos antiguos automáticamente.
4. Espera 1–2 minutos y recarga el sitio con Ctrl+Shift+R.

## Estructura

```
index.html        Página principal
styles.css        Estilos
recetas.js        Las 160 recetas (los datos)
ilustraciones.js  Ilustraciones SVG y colores por país
app.js            Búsqueda, filtros, mapa, porciones y vista de detalle
img/              Imágenes: mapa.jpg (el mapa) y fotos de recetas
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
`foto: "img/mi-foto.jpg"` y sube la imagen a la carpeta `img/` del
repositorio: la foto reemplaza automáticamente al dibujo, en la tarjeta
y en el detalle. El completo italiano (`cl-06`) ya viene con foto como
ejemplo funcionando.

## Cómo generar fotos para las demás recetas

Puedes crear las fotos con ChatGPT, Gemini u otro generador de imágenes.
Para que todas se vean consistentes entre sí (mismo estilo que el completo
italiano), usa esta plantilla de prompt cambiando solo lo que está entre
corchetes:

> Fotografía profesional de comida: [NOMBRE DEL PLATO], plato tradicional
> de [PAÍS], servido en [plato de cerámica / vaso / fuente según corresponda],
> sobre una tabla de madera oscura, luz natural cálida lateral, primer plano
> apetitoso, estilo editorial gastronómico, fondo ligeramente desenfocado con
> algunos ingredientes del plato, proporción 3:2.

Flujo para cada receta:

1. Genera la imagen y descárgala.
2. Renómbrala en minúsculas y sin espacios, por ejemplo `pastel-de-choclo.jpg`.
3. Súbela a la carpeta `img/` del repositorio (entra a la carpeta `img` →
   Add file → Upload files).
4. En `recetas.js`, agrega a esa receta: `foto:"img/pastel-de-choclo.jpg",`
   justo después del `id`.
5. Commit, espera 1–2 minutos y recarga.

Consejo: si la imagen pesa más de ~400 KB, redúcela antes de subirla
(cualquier herramienta como squoosh.app sirve) para que el sitio cargue rápido.

## Agregar un país nuevo

1. En `ilustraciones.js`, agrega el país con su color al objeto `PAISES`.
2. En `app.js`, agrega su posición en el mapa al objeto `MAPA_POS`
   (porcentajes x e y sobre la imagen del mapa, y el lado de la etiqueta:
   "abajo", "arriba", "izq" o "der").
3. En `recetas.js`, agrega sus recetas con `pais` exactamente igual al nombre
   registrado en `PAISES`.

## Cambiar el nombre del sitio

"Sabores del Mundo" aparece en `index.html` (título, encabezado y pie).
