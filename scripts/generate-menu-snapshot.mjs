import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { mockMenu, mockOfertas } from "../src/data/mockMenu.js";

if (existsSync(".env")) {
  try {
    process.loadEnvFile(".env");
  } catch (e) {
    // ignorar en entornos donde no aplique
  }
}

const SHEET_ID = process.env.VITE_SHEETS_MENU_ID;
const OUT_PATH = "src/data/menuSnapshot.json";

// parseBoolean ultrasensible: evalúa .v, .f, booleanos, números y cadenas en español/inglés
const parseBoolean = (cell) => {
  if (!cell) return false;
  const val = cell.v !== undefined && cell.v !== null ? cell.v : cell.f;
  if (val === undefined || val === null) return false;
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === 1;
  const str = val.toString().toUpperCase().trim();
  return ["VERDADERO", "VERDAD", "SÍ", "SI", "YES", "TRUE", "1"].includes(str);
};

const parseNumber = (cell) => {
  if (!cell) return 0;
  const val = cell.v !== undefined && cell.v !== null ? cell.v : cell.f;
  if (val === undefined || val === null || val === "") return 0;
  if (typeof val === "number") return val;
  const cleaned = val
    .toString()
    .trim()
    .replace(/,(?=\d{3}(?:\D|$))/g, "")
    .replace(",", ".");
  const num = Number(cleaned);
  return isNaN(num) ? 0 : num;
};

async function fetchFromSheet() {
  const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
  const res = await fetch(GVIZ_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const jsonString = text.substring(
    text.indexOf("{"),
    text.lastIndexOf("}") + 1,
  );
  const data = JSON.parse(jsonString);

  const rawRows = data.table?.rows || [];

  // Detectar si la primera fila son los encabezados (ej. "ID", "NOMBRE PRODUCTO")
  const firstRowIsHeader =
    rawRows.length > 0 &&
    rawRows[0].c &&
    rawRows[0].c[1]?.v?.toString().toLowerCase().includes("nombre");

  // Si la primera fila es encabezado se descarta, si es un producto real se conserva
  const rows = firstRowIsHeader ? rawRows.slice(1) : rawRows;

  const parsedMenu = rows
    .filter((row) => row && row.c && row.c[1] && row.c[1]?.v)
    .map((row, index) => {
      const c = row.c;
      const nombre = c[1]?.v?.toString().trim() || "Sin nombre";
      const esDestacado = parseBoolean(c[7]);
      const esOfertaVal = parseBoolean(c[9]);
      const precio = parseNumber(c[3]);
      const precioAntesVal = parseNumber(c[4]);

      return {
        id: c[0]?.v?.toString() || `item-${index + 1}`,
        nombre: nombre,
        categoria: c[2]?.v?.toString().trim() || "General",
        precio: precio,
        precioAntes: precioAntesVal > 0 ? precioAntesVal : null,
        descripcion: c[5]?.v || "",
        imagen:
          c[6]?.v ||
          "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format",
        destacadoPinterest: esDestacado ? "SÍ" : "NO",
        destacado: esDestacado,
        formatoPinterest:
          c[8]?.v?.toString().toLowerCase().trim() || "cuadrado",
        esOferta: esOfertaVal,
      };
    });

  const ofertas = parsedMenu.reduce((acc, item) => {
    const esCategoriaOferta = item.categoria.toLowerCase().includes("oferta");
    const tieneDescuento = item.precioAntes && item.precioAntes > item.precio;

    if (item.esOferta || esCategoriaOferta || tieneDescuento) {
      acc.push({
        id: item.id,
        titulo: item.nombre,
        descuento: "Oferta",
        descripcion: item.descripcion,
        precioAntes:
          item.precioAntes ?? (item.precio > 0 ? item.precio + 10 : null),
        precioOferta: item.precio,
        imagen: item.imagen,
        valido: "Disponible Hoy",
      });
    }
    return acc;
  }, []);

  // Diagnóstico en consola para ver qué detectó exactamente
  console.log("\n--- DIAGNÓSTICO DE PRODUCTOS Y OFERTAS ---");
  parsedMenu.forEach((p) => {
    const esOf =
      p.esOferta ||
      p.categoria.toLowerCase().includes("oferta") ||
      (p.precioAntes && p.precioAntes > p.precio);
    console.log(
      `• [${esOf ? "OFERTA" : "PRODUCTO"}] ${p.nombre} | Cat: "${
        p.categoria
      }" | esOferta: ${p.esOferta}`,
    );
  });
  console.log("-------------------------------------------\n");

  return { menu: parsedMenu, ofertas };
}

async function main() {
  let payload;

  if (!SHEET_ID) {
    console.warn(
      "[generate-menu-snapshot] VITE_SHEETS_MENU_ID no definido. Usando mockMenu.",
    );
    payload = { menu: mockMenu, ofertas: mockOfertas };
  } else {
    try {
      payload = await fetchFromSheet();
      if (payload.menu.length === 0) {
        console.warn("[generate-menu-snapshot] Sheet vacío, usando mockMenu.");
        payload = { menu: mockMenu, ofertas: mockOfertas };
      } else {
        console.log(
          `[generate-menu-snapshot] OK: ${payload.menu.length} productos, ${payload.ofertas.length} ofertas.`,
        );
      }
    } catch (err) {
      console.error(
        "[generate-menu-snapshot] Error leyendo Sheets, usando mockMenu:",
        err.message,
      );
      payload = { menu: mockMenu, ofertas: mockOfertas };
    }
  }

  if (!existsSync("src/data")) {
    await mkdir("src/data", { recursive: true });
  }

  await writeFile(OUT_PATH, JSON.stringify(payload, null, 2), "utf-8");
}

main();
