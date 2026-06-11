/* Sabores del Mundo — lógica de la interfaz */

const estado = { pais: "Todos", tipo: "todos", dif: "todas", busqueda: "" };

const TIPOS = [
  { id: "todos",  nombre: "Todos" },
  { id: "comida", nombre: "Comidas" },
  { id: "bebida", nombre: "Bebidas" },
  { id: "postre", nombre: "Postres" }
];

const DIFS = [
  { id: "todas", nombre: "Todas" },
  { id: "facil", nombre: "Fácil",  estrellas: "★–★★" },
  { id: "media", nombre: "Media",  estrellas: "★★★" },
  { id: "alta",  nombre: "Alta",   estrellas: "★★★★+" }
];

const $grid     = document.getElementById("grid");
const $chips    = document.getElementById("chips");
const $tipos    = document.getElementById("chips-tipo");
const $difs     = document.getElementById("chips-dif");
const $buscar   = document.getElementById("buscar");
const $contador = document.getElementById("contador");
const $vacio    = document.getElementById("vacio");
const $franja   = document.getElementById("franja-paises");
const $mapa     = document.getElementById("mapa");
const $mapaBtn  = document.getElementById("mapa-toggle");
const $overlay  = document.getElementById("detalle");
const $panel    = document.getElementById("detalle-panel");
const $cerrar   = document.getElementById("cerrar-detalle");

let ultimaTarjeta = null;
let recetaAbierta = null;
let porcionesSel = 0;

/* ---------- utilidades ---------- */

function normalizar(texto) {
  return (texto || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function formatoTiempo(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

function capitalizar(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function etiquetaTipo(r) {
  return r.tipo.map(capitalizar).join(" · ");
}

function estrellas(nivel) {
  let html = "";
  for (let i = 1; i <= 5; i++) {
    html += `<span class="estrella${i <= nivel ? " llena" : ""}">★</span>`;
  }
  return `<span class="estrellas" role="img" aria-label="Dificultad ${nivel} de 5">${html}</span>`;
}

function grupoDif(nivel) {
  if (nivel <= 2) return "facil";
  if (nivel === 3) return "media";
  return "alta";
}

/* ---------- escalado de cantidades según porciones ----------
   Multiplica los números de un ingrediente por el factor, respetando
   fracciones ("1/2") y decimales ("2,5"). No toca medidas de tamaño
   o temperatura (cm, °C) ni patrones como "1x6". */

const FRACCIONES = [
  [0.25, "1/4"], [0.33, "1/3"], [0.5, "1/2"],
  [0.66, "2/3"], [0.75, "3/4"]
];

function formatoCantidad(v) {
  if (v < 0.95) {
    let mejor = FRACCIONES[0];
    for (const f of FRACCIONES) {
      if (Math.abs(f[0] - v) < Math.abs(mejor[0] - v)) mejor = f;
    }
    return mejor[1];
  }
  if (v < 10) {
    const r = Math.round(v * 10) / 10;
    return Number.isInteger(r) ? String(r) : String(r).replace(".", ",");
  }
  return String(Math.round(v));
}

function escalarIngrediente(texto, factor) {
  if (factor === 1) return texto;
  return texto.replace(/(\d+\/\d+|\d+(?:[.,]\d+)?)/g, (num, _, pos) => {
    const despues = texto.slice(pos + num.length);
    const antes = texto.slice(0, pos);
    // No escalar tamaños, temperaturas ni dimensiones
    if (/^\s?(cm|°|%)/.test(despues)) return num;
    if (/^x\d/.test(despues) || /x$/.test(antes)) return num;
    let valor;
    if (num.includes("/")) {
      const [a, b] = num.split("/");
      valor = parseFloat(a) / parseFloat(b);
    } else {
      valor = parseFloat(num.replace(",", "."));
    }
    return formatoCantidad(valor * factor);
  });
}

/* ---------- franja de colores ---------- */

function pintarFranja() {
  $franja.innerHTML = Object.values(PAISES)
    .map(p => `<span style="background:${p.color}"></span>`).join("");
}

/* ---------- chips de filtros ---------- */

function pintarChips() {
  const nombres = ["Todos", ...Object.keys(PAISES)];
  $chips.innerHTML = nombres.map(n => {
    const activo = n === estado.pais ? " activo" : "";
    const punto = n === "Todos" ? "" :
      `<span class="punto" style="background:${PAISES[n].color}"></span>`;
    return `<button class="chip${activo}" data-pais="${n}" aria-pressed="${n === estado.pais}">${punto}${n}</button>`;
  }).join("");

  $tipos.innerHTML = TIPOS.map(t => {
    const activo = t.id === estado.tipo ? " activo" : "";
    return `<button class="chip chico${activo}" data-tipo="${t.id}" aria-pressed="${t.id === estado.tipo}">${t.nombre}</button>`;
  }).join("");

  $difs.innerHTML = DIFS.map(d => {
    const activo = d.id === estado.dif ? " activo" : "";
    const extra = d.estrellas ? ` <span class="mini-estrellas">${d.estrellas}</span>` : "";
    return `<button class="chip chico${activo}" data-dif="${d.id}" aria-pressed="${d.id === estado.dif}">${d.nombre}${extra}</button>`;
  }).join("");

  pintarMapaEstado();
}

$chips.addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  estado.pais = b.dataset.pais;
  pintarChips(); pintarGrid();
});

$tipos.addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  estado.tipo = b.dataset.tipo;
  pintarChips(); pintarGrid();
});

$difs.addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  estado.dif = b.dataset.dif;
  pintarChips(); pintarGrid();
});

$buscar.addEventListener("input", () => {
  estado.busqueda = $buscar.value;
  pintarGrid();
});

/* ---------- mapa interactivo ---------- */

const MAPA_POS = {
  /* país: [x %, y % sobre la imagen del mapa, lado de la etiqueta] */
  "México":    [26.0, 53.0, "abajo"],
  "Venezuela": [33.5, 59.0, "der"],
  "Colombia":  [31.0, 59.5, "izq"],
  "Ecuador":   [29.8, 62.5, "izq"],
  "Perú":      [30.8, 66.5, "izq"],
  "Brasil":    [35.5, 65.0, "der"],
  "Bolivia":   [33.0, 69.5, "der"],
  "Paraguay":  [33.8, 72.5, "der"],
  "Chile":     [31.3, 75.0, "izq"],
  "Argentina": [32.8, 78.0, "abajo"],
  "Uruguay":   [34.0, 75.6, "der"],
  "España":    [46.6, 42.3, "abajo"],
  "Francia":   [48.0, 38.5, "arriba"],
  "Italia":    [51.3, 42.5, "der"],
  "China":     [66.5, 40.0, "abajo"],
  "Japón":     [76.0, 38.5, "der"]
};

function pintarMapa() {
  const puntos = Object.entries(MAPA_POS).map(([pais, [x, y, lado]]) => {
    const c = PAISES[pais].color;
    return `<button type="button" class="mapa-pais lado-${lado}" data-pais="${pais}"
      style="left:${x}%; top:${y}%" aria-label="Ver recetas de ${pais}">
      <span class="punto-mapa" style="background:${c}"></span>
      <span class="mapa-etiqueta">${pais}</span>
    </button>`;
  }).join("");

  $mapa.innerHTML = `<div class="mapa-lienzo">
    <img src="img/mapa.jpg" alt="Mapamundi hecho con especias; elige un país para ver sus recetas">
    ${puntos}
  </div>`;
}

function pintarMapaEstado() {
  $mapa.querySelectorAll(".mapa-pais").forEach(b => {
    b.classList.toggle("activo", b.dataset.pais === estado.pais);
  });
}

$mapa.addEventListener("click", e => {
  const g = e.target.closest(".mapa-pais");
  if (!g) return;
  estado.pais = (estado.pais === g.dataset.pais) ? "Todos" : g.dataset.pais;
  pintarChips(); pintarGrid();
});

$mapaBtn.addEventListener("click", () => {
  const oculto = $mapa.classList.toggle("oculto");
  $mapaBtn.setAttribute("aria-expanded", String(!oculto));
  $mapaBtn.textContent = oculto ? "🌍 Mostrar el mapa" : "🌍 Ocultar el mapa";
});

/* ---------- filtrado ---------- */

function recetasFiltradas() {
  const q = normalizar(estado.busqueda.trim());
  return RECETAS.filter(r => {
    if (estado.pais !== "Todos" && r.pais !== estado.pais) return false;
    if (estado.tipo !== "todos" && !r.tipo.includes(estado.tipo)) return false;
    if (estado.dif !== "todas" && grupoDif(r.nivel) !== estado.dif) return false;
    if (!q) return true;
    const pajar = normalizar(r.nombre + " " + r.pais + " " + r.tipo.join(" ") + " " + r.ingredientes.join(" "));
    return q.split(/\s+/).every(p => pajar.includes(p));
  });
}

/* ---------- grilla ---------- */

function pintarGrid() {
  const lista = recetasFiltradas();

  $contador.textContent = lista.length === 1 ? "1 receta" : `${lista.length} recetas`;
  $vacio.hidden = lista.length !== 0;
  $grid.hidden = lista.length === 0;

  $grid.innerHTML = lista.map(r => {
    const color = PAISES[r.pais].color;
    return `
    <article class="tarjeta" data-id="${r.id}" tabindex="0" role="button"
             aria-label="${r.nombre}, receta de ${r.pais}">
      <div class="tarjeta-ilu">
        <span class="badge-tipo">${etiquetaTipo(r)}</span>
        ${iluHTML(r)}
      </div>
      <div class="tarjeta-info">
        <span class="eyebrow" style="color:${color}">${r.pais}</span>
        <h3>${r.nombre}</h3>
        <p class="meta">${formatoTiempo(r.tiempo)} · ${r.porciones} porciones · ${estrellas(r.nivel)}</p>
      </div>
    </article>`;
  }).join("");
}

$grid.addEventListener("click", e => {
  const t = e.target.closest(".tarjeta");
  if (t) abrirDetalle(t.dataset.id, t);
});

$grid.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const t = e.target.closest(".tarjeta");
  if (t) { e.preventDefault(); abrirDetalle(t.dataset.id, t); }
});

/* ---------- detalle ---------- */

function pintarIngredientes() {
  const r = recetaAbierta;
  const factor = porcionesSel / r.porciones;
  document.getElementById("porciones-num").textContent = porcionesSel;
  document.getElementById("lista-ingredientes").innerHTML =
    r.ingredientes.map(i => `<li>${escalarIngrediente(i, factor)}</li>`).join("");
  document.getElementById("nota-porciones").hidden = porcionesSel === r.porciones;
}

function abrirDetalle(id, origen) {
  const r = RECETAS.find(x => x.id === id);
  if (!r) return;
  ultimaTarjeta = origen || null;
  recetaAbierta = r;
  porcionesSel = r.porciones;
  const color = PAISES[r.pais].color;

  $panel.innerHTML = `
    <div class="detalle-ilu" style="background:${color}1f">
      <span class="badge-tipo">${etiquetaTipo(r)}</span>
      ${iluHTML(r)}
    </div>
    <div class="detalle-contenido">
      <span class="eyebrow" style="color:${color}">${r.pais}</span>
      <h2 id="detalle-titulo">${r.nombre}</h2>
      <p class="detalle-desc">${r.desc}</p>
      <ul class="detalle-meta">
        <li><strong>${formatoTiempo(r.tiempo)}</strong><span>tiempo</span></li>
        <li>
          <strong class="stepper">
            <button type="button" id="menos-porcion" aria-label="Una porción menos">−</button>
            <span id="porciones-num">${r.porciones}</span>
            <button type="button" id="mas-porcion" aria-label="Una porción más">+</button>
          </strong>
          <span>porciones</span>
        </li>
        <li><strong>${estrellas(r.nivel)}</strong><span>dificultad: ${r.dificultad.toLowerCase()}</span></li>
      </ul>
      <p class="nota-porciones" id="nota-porciones" hidden>Las cantidades están ajustadas a ${"" /* texto fijo */}tus porciones. El tiempo de preparación varía poco con las porciones.</p>
      <h3>Ingredientes</h3>
      <ul class="ingredientes" id="lista-ingredientes"></ul>
      <h3>Preparación</h3>
      <ol class="pasos">
        ${r.pasos.map(p => `<li>${p}</li>`).join("")}
      </ol>
    </div>`;

  document.getElementById("menos-porcion").addEventListener("click", () => {
    if (porcionesSel > 1) { porcionesSel--; pintarIngredientes(); }
  });
  document.getElementById("mas-porcion").addEventListener("click", () => {
    if (porcionesSel < 50) { porcionesSel++; pintarIngredientes(); }
  });

  pintarIngredientes();
  $overlay.hidden = false;
  document.body.classList.add("sin-scroll");
  $cerrar.focus();
}

function cerrarDetalle() {
  $overlay.hidden = true;
  document.body.classList.remove("sin-scroll");
  if (ultimaTarjeta) ultimaTarjeta.focus();
}

$cerrar.addEventListener("click", cerrarDetalle);
$overlay.addEventListener("click", e => { if (e.target === $overlay) cerrarDetalle(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !$overlay.hidden) cerrarDetalle();
});

/* ---------- arranque ---------- */

pintarFranja();
pintarMapa();
pintarChips();
pintarGrid();
