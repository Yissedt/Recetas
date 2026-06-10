/* Sabores de Sudamérica — ilustraciones SVG generadas
   Cada receta define ilu: { t: "plantilla", c: [color1, color2, color3] }.
   Para usar una foto real en lugar de la ilustración, agrega a la receta:
   foto: "img/mi-foto.jpg"  (la imagen reemplaza automáticamente al SVG). */

const PAISES = {
  "Argentina": { color: "#6E9BBF" },
  "Bolivia":   { color: "#B05A2F" },
  "Brasil":    { color: "#3B7D54" },
  "Chile":     { color: "#B23A33" },
  "Colombia":  { color: "#D2A036" },
  "Ecuador":   { color: "#2E8C86" },
  "Paraguay":  { color: "#5A63A8" },
  "Perú":      { color: "#8A4A6B" },
  "Uruguay":   { color: "#4F6D8F" },
  "Venezuela": { color: "#7A8C3B" }
};

const LINEA = "#E3DDD2";   // trazo de loza
const LOZA  = "#FFFFFF";   // platos y bowls
const VAPOR = "#D8D2C6";

const ILU = {
  plato(c) {
    return `
      <ellipse cx="100" cy="142" rx="60" ry="8" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="124" rx="66" ry="20" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <ellipse cx="100" cy="122" rx="48" ry="13" fill="none" stroke="#F0EBE1" stroke-width="2"/>
      <ellipse cx="100" cy="111" rx="36" ry="15" fill="${c[0]}"/>
      <ellipse cx="100" cy="103" rx="25" ry="8" fill="${c[1]}"/>
      <circle cx="84" cy="99" r="3.2" fill="${c[2]}"/>
      <circle cx="103" cy="95" r="3.2" fill="${c[2]}"/>
      <circle cx="116" cy="101" r="3.2" fill="${c[2]}"/>`;
  },
  bowl(c) {
    return `
      <ellipse cx="100" cy="154" rx="52" ry="7" fill="#26221C" opacity="0.05"/>
      <path d="M38 106 Q38 150 100 150 Q162 150 162 106 Z" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <ellipse cx="100" cy="106" rx="55" ry="12" fill="${c[0]}"/>
      <circle cx="84" cy="105" r="6" fill="${c[1]}"/>
      <circle cx="109" cy="102" r="5" fill="${c[1]}"/>
      <circle cx="122" cy="107" r="4" fill="${c[1]}"/>
      <circle cx="94" cy="100" r="2.6" fill="${c[2]}"/>
      <circle cx="114" cy="98" r="2.6" fill="${c[2]}"/>
      <path d="M86 80 q6 -9 0 -18" stroke="${VAPOR}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M114 82 q6 -9 0 -18" stroke="${VAPOR}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  },
  empanada(c) {
    return `
      <ellipse cx="100" cy="146" rx="58" ry="8" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="134" rx="62" ry="14" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <path d="M48 126 A52 52 0 0 1 152 126 Z" fill="${c[0]}"/>
      <path d="M48 126 A52 52 0 0 1 152 126" fill="none" stroke="${c[1]}" stroke-width="7" stroke-dasharray="2 11" stroke-linecap="round"/>
      <circle cx="86" cy="112" r="3" fill="${c[2]}"/>
      <circle cx="100" cy="105" r="3" fill="${c[2]}"/>
      <circle cx="114" cy="112" r="3" fill="${c[2]}"/>`;
  },
  arepa(c) {
    return `
      <ellipse cx="100" cy="148" rx="56" ry="8" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="128" rx="52" ry="15" fill="${c[0]}"/>
      <rect x="56" y="106" width="88" height="18" rx="9" fill="${c[1]}"/>
      <circle cx="70" cy="115" r="7" fill="${c[1]}"/>
      <circle cx="130" cy="115" r="7" fill="${c[1]}"/>
      <ellipse cx="100" cy="100" rx="52" ry="15" fill="${c[0]}"/>
      <circle cx="86" cy="96" r="2.6" fill="${c[2]}"/>
      <circle cx="102" cy="93" r="2.6" fill="${c[2]}"/>
      <circle cx="116" cy="98" r="2.6" fill="${c[2]}"/>`;
  },
  sandwich(c) {
    return `
      <ellipse cx="100" cy="150" rx="58" ry="8" fill="#26221C" opacity="0.05"/>
      <rect x="52" y="126" width="96" height="15" rx="7.5" fill="${c[0]}"/>
      <rect x="48" y="114" width="104" height="10" rx="5" fill="${c[2]}"/>
      <rect x="52" y="101" width="96" height="12" rx="6" fill="${c[1]}"/>
      <path d="M52 101 Q52 68 100 68 Q148 68 148 101 Z" fill="${c[0]}"/>
      <ellipse cx="84" cy="84" rx="3" ry="2" fill="#FFF6E3" opacity="0.85"/>
      <ellipse cx="101" cy="79" rx="3" ry="2" fill="#FFF6E3" opacity="0.85"/>
      <ellipse cx="117" cy="86" rx="3" ry="2" fill="#FFF6E3" opacity="0.85"/>`;
  },
  vaso(c) {
    return `
      <ellipse cx="100" cy="160" rx="36" ry="6" fill="#26221C" opacity="0.05"/>
      <path d="M70 58 L78 148 Q79 156 87 156 H113 Q121 156 122 148 L130 58 Z" fill="#F7F5EF" stroke="${LINEA}" stroke-width="2"/>
      <path d="M74.5 90 L80.5 146 Q81 150 86 150 H114 Q119 150 119.5 146 L125.5 90 Z" fill="${c[0]}"/>
      <path d="M73 72 L75 92 L125 92 L127 72 Z" fill="${c[1]}"/>
      <line x1="114" y1="36" x2="106" y2="92" stroke="#C98B5A" stroke-width="4" stroke-linecap="round"/>
      <circle cx="129" cy="60" r="9" fill="${c[2]}"/>
      <circle cx="129" cy="60" r="4" fill="#FFF6E3" opacity="0.7"/>`;
  },
  copa(c) {
    return `
      <ellipse cx="100" cy="158" rx="30" ry="5" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="152" rx="20" ry="5" fill="${LINEA}"/>
      <rect x="97" y="126" width="6" height="26" fill="${LINEA}"/>
      <path d="M62 68 Q62 128 100 128 Q138 128 138 68 Z" fill="#F7F5EF" stroke="${LINEA}" stroke-width="2"/>
      <path d="M66 94 Q72 122 100 122 Q128 122 134 94 Z" fill="${c[1]}"/>
      <path d="M64 72 Q66 98 100 98 Q134 98 136 72 Z" fill="${c[0]}"/>
      <circle cx="100" cy="64" r="7" fill="${c[2]}"/>`;
  },
  brocheta(c) {
    return `
      <ellipse cx="100" cy="146" rx="62" ry="9" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="136" rx="64" ry="13" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <line x1="38" y1="100" x2="162" y2="100" stroke="#B5926B" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="52" y="91" width="22" height="18" rx="5" fill="${c[0]}"/>
      <rect x="80" y="93" width="14" height="14" rx="4" fill="${c[1]}"/>
      <rect x="100" y="91" width="22" height="18" rx="5" fill="${c[0]}"/>
      <rect x="128" y="93" width="14" height="14" rx="4" fill="${c[1]}"/>
      <line x1="46" y1="122" x2="154" y2="122" stroke="#B5926B" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="62" y="113" width="20" height="17" rx="5" fill="${c[0]}"/>
      <rect x="88" y="115" width="13" height="13" rx="4" fill="${c[1]}"/>
      <rect x="107" y="113" width="20" height="17" rx="5" fill="${c[0]}"/>
      <circle cx="63" cy="97" r="2.2" fill="${c[2]}"/>
      <circle cx="111" cy="97" r="2.2" fill="${c[2]}"/>
      <circle cx="72" cy="119" r="2.2" fill="${c[2]}"/>`;
  },
  envuelto(c) {
    return `
      <ellipse cx="100" cy="150" rx="60" ry="8" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="118" rx="36" ry="28" fill="${c[1]}"/>
      <path d="M42 94 L92 103 L92 133 L42 142 Z" fill="${c[0]}"/>
      <path d="M158 94 L108 103 L108 133 L158 142 Z" fill="${c[0]}"/>
      <path d="M50 100 L86 107 M50 136 L86 129" stroke="#26221C" stroke-width="1.5" opacity="0.12" fill="none"/>
      <path d="M150 100 L114 107 M150 136 L114 129" stroke="#26221C" stroke-width="1.5" opacity="0.12" fill="none"/>
      <line x1="72" y1="92" x2="72" y2="146" stroke="${c[2]}" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="128" y1="92" x2="128" y2="146" stroke="${c[2]}" stroke-width="3.5" stroke-linecap="round"/>`;
  },
  pan(c) {
    return `
      <ellipse cx="100" cy="148" rx="62" ry="9" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="138" rx="64" ry="13" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <circle cx="74" cy="118" r="21" fill="${c[0]}"/>
      <circle cx="126" cy="118" r="21" fill="${c[0]}"/>
      <circle cx="100" cy="97" r="21" fill="${c[0]}"/>
      <ellipse cx="68" cy="111" rx="7" ry="4.5" fill="${c[1]}" opacity="0.9"/>
      <ellipse cx="120" cy="111" rx="7" ry="4.5" fill="${c[1]}" opacity="0.9"/>
      <ellipse cx="94" cy="90" rx="7" ry="4.5" fill="${c[1]}" opacity="0.9"/>
      <circle cx="82" cy="122" r="1.8" fill="${c[2]}"/>
      <circle cx="132" cy="124" r="1.8" fill="${c[2]}"/>
      <circle cx="106" cy="101" r="1.8" fill="${c[2]}"/>`;
  },
  pastel(c) {
    return `
      <ellipse cx="100" cy="150" rx="62" ry="8" fill="#26221C" opacity="0.05"/>
      <ellipse cx="40" cy="116" rx="7" ry="6" fill="${c[1]}"/>
      <ellipse cx="160" cy="116" rx="7" ry="6" fill="${c[1]}"/>
      <rect x="44" y="104" width="112" height="38" rx="10" fill="${c[1]}"/>
      <rect x="48" y="95" width="104" height="17" rx="8.5" fill="${c[0]}"/>
      <circle cx="72" cy="102" r="5" fill="${c[2]}" opacity="0.9"/>
      <circle cx="98" cy="100" r="5" fill="${c[2]}" opacity="0.9"/>
      <circle cx="126" cy="103" r="5" fill="${c[2]}" opacity="0.9"/>
      <path d="M88 82 q5 -8 0 -16" stroke="${VAPOR}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M112 84 q5 -8 0 -16" stroke="${VAPOR}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  },
  porcion(c) {
    return `
      <ellipse cx="100" cy="146" rx="58" ry="8" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="134" rx="60" ry="13" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <path d="M58 128 L142 128 L100 70 Z" fill="${c[0]}"/>
      <line x1="78" y1="110" x2="122" y2="110" stroke="${c[1]}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="100" cy="64" r="6" fill="${c[2]}"/>`;
  },
  taza(c) {
    return `
      <ellipse cx="100" cy="148" rx="52" ry="9" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="140" rx="52" ry="10" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <path d="M64 88 Q64 134 100 134 Q136 134 136 88 Z" fill="${c[1]}" stroke="${LINEA}" stroke-width="2"/>
      <path d="M136 96 q24 5 0 26" stroke="${c[1]}" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="100" cy="90" rx="34" ry="9" fill="${c[0]}"/>
      <ellipse cx="100" cy="88" rx="16" ry="4.5" fill="${c[2]}" opacity="0.9"/>
      <path d="M88 70 q6 -9 0 -18" stroke="${VAPOR}" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M112 72 q6 -9 0 -18" stroke="${VAPOR}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  },
  pescado(c) {
    return `
      <ellipse cx="100" cy="142" rx="66" ry="9" fill="#26221C" opacity="0.05"/>
      <ellipse cx="100" cy="130" rx="68" ry="15" fill="${LOZA}" stroke="${LINEA}" stroke-width="2"/>
      <path d="M88 96 Q98 84 110 95 L96 100 Z" fill="${c[1]}"/>
      <ellipse cx="96" cy="111" rx="40" ry="16" fill="${c[0]}"/>
      <path d="M132 111 L156 96 L156 126 Z" fill="${c[1]}"/>
      <circle cx="68" cy="107" r="2.6" fill="#3A2E2A"/>
      <path d="M88 111 q8 6 16 0" stroke="#26221C" stroke-width="1.5" fill="none" opacity="0.15"/>
      <circle cx="56" cy="128" r="6" fill="${c[2]}"/>
      <circle cx="144" cy="126" r="6" fill="${c[2]}"/>`;
  }
};

/* Devuelve el HTML de la ilustración (o la foto, si existe) de una receta. */
function iluHTML(receta) {
  if (receta.foto) {
    return `<img src="${receta.foto}" alt="${receta.nombre}" loading="lazy">`;
  }
  const pais = PAISES[receta.pais] || { color: "#888" };
  const plantilla = ILU[receta.ilu && receta.ilu.t] || ILU.plato;
  const colores = (receta.ilu && receta.ilu.c) || ["#D9A05B", "#C0392B", "#5C8A4E"];
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de ${receta.nombre}">
    <circle cx="100" cy="100" r="86" fill="${pais.color}" opacity="0.13"/>
    ${plantilla(colores)}
  </svg>`;
}
