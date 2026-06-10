/* Sabores de Sudamérica — lógica de la interfaz */

const estado = { pais: "Todos", busqueda: "" };

const $grid    = document.getElementById("grid");
const $chips   = document.getElementById("chips");
const $buscar  = document.getElementById("buscar");
const $contador= document.getElementById("contador");
const $vacio   = document.getElementById("vacio");
const $franja  = document.getElementById("franja-paises");
const $overlay = document.getElementById("detalle");
const $panel   = document.getElementById("detalle-panel");
const $cerrar  = document.getElementById("cerrar-detalle");

let ultimaTarjeta = null; // para devolver el foco al cerrar el detalle

/* ---------- utilidades ---------- */

function normalizar(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatoTiempo(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/* ---------- franja de países (firma visual del sitio) ---------- */

function pintarFranja() {
  $franja.innerHTML = Object.values(PAISES)
    .map(p => `<span style="background:${p.color}"></span>`)
    .join("");
}

/* ---------- chips de filtro ---------- */

function pintarChips() {
  const nombres = ["Todos", ...Object.keys(PAISES)];
  $chips.innerHTML = nombres.map(n => {
    const activo = n === estado.pais ? " activo" : "";
    const punto = n === "Todos"
      ? ""
      : `<span class="punto" style="background:${PAISES[n].color}"></span>`;
    return `<button class="chip${activo}" data-pais="${n}" aria-pressed="${n === estado.pais}">${punto}${n}</button>`;
  }).join("");
}

$chips.addEventListener("click", (e) => {
  const boton = e.target.closest(".chip");
  if (!boton) return;
  estado.pais = boton.dataset.pais;
  pintarChips();
  pintarGrid();
});

/* ---------- búsqueda ---------- */

$buscar.addEventListener("input", () => {
  estado.busqueda = $buscar.value;
  pintarGrid();
});

/* ---------- filtrado ---------- */

function recetasFiltradas() {
  const q = normalizar(estado.busqueda.trim());
  return RECETAS.filter(r => {
    if (estado.pais !== "Todos" && r.pais !== estado.pais) return false;
    if (!q) return true;
    const pajar = normalizar(r.nombre + " " + r.pais + " " + r.ingredientes.join(" "));
    return q.split(/\s+/).every(palabra => pajar.includes(palabra));
  });
}

/* ---------- grilla de tarjetas ---------- */

function pintarGrid() {
  const lista = recetasFiltradas();

  $contador.textContent = lista.length === 1
    ? "1 receta"
    : `${lista.length} recetas`;

  $vacio.hidden = lista.length !== 0;
  $grid.hidden  = lista.length === 0;

  $grid.innerHTML = lista.map(r => {
    const color = PAISES[r.pais].color;
    return `
    <article class="tarjeta" data-id="${r.id}" tabindex="0" role="button"
             aria-label="${r.nombre}, receta de ${r.pais}">
      <div class="tarjeta-ilu">${iluHTML(r)}</div>
      <div class="tarjeta-info">
        <span class="eyebrow" style="color:${color}">${r.pais}</span>
        <h3>${r.nombre}</h3>
        <p class="meta">${formatoTiempo(r.tiempo)} · ${r.porciones} porciones · ${r.dificultad}</p>
      </div>
    </article>`;
  }).join("");
}

$grid.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".tarjeta");
  if (tarjeta) abrirDetalle(tarjeta.dataset.id, tarjeta);
});

$grid.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const tarjeta = e.target.closest(".tarjeta");
  if (tarjeta) { e.preventDefault(); abrirDetalle(tarjeta.dataset.id, tarjeta); }
});

/* ---------- detalle ---------- */

function abrirDetalle(id, origen) {
  const r = RECETAS.find(x => x.id === id);
  if (!r) return;
  ultimaTarjeta = origen || null;
  const color = PAISES[r.pais].color;

  $panel.innerHTML = `
    <div class="detalle-ilu" style="background:${color}1f">
      ${iluHTML(r)}
    </div>
    <div class="detalle-contenido">
      <span class="eyebrow" style="color:${color}">${r.pais}</span>
      <h2 id="detalle-titulo">${r.nombre}</h2>
      <p class="detalle-desc">${r.desc}</p>
      <ul class="detalle-meta">
        <li><strong>${formatoTiempo(r.tiempo)}</strong><span>tiempo</span></li>
        <li><strong>${r.porciones}</strong><span>porciones</span></li>
        <li><strong>${r.dificultad}</strong><span>dificultad</span></li>
      </ul>
      <h3>Ingredientes</h3>
      <ul class="ingredientes">
        ${r.ingredientes.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <h3>Preparación</h3>
      <ol class="pasos">
        ${r.pasos.map(p => `<li>${p}</li>`).join("")}
      </ol>
    </div>`;

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

$overlay.addEventListener("click", (e) => {
  if (e.target === $overlay) cerrarDetalle();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !$overlay.hidden) cerrarDetalle();
});

/* ---------- arranque ---------- */

pintarFranja();
pintarChips();
pintarGrid();
