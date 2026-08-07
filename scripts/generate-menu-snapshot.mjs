import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { mockMenu, mockOfertas } from "../src/data/mockMenu.js";

const SHEET_ID = process.env.VITE_SHEETS_MENU_ID;
const OUT_PATH = "src/data/menuSnapshot.json";

const parseBoolean = (val) => {
  if (val === undefined || val === null) return false;
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === 1;
  const str = val.toString().toUpperCase().trim();
  return ["SÍ", "SI", "YES", "TRUE", "1"].includes(str);
};

const parseNumber = (val) => {
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

  const rows = data.table?.rows || [];

  const parsedMenu = rows
    .slice(1)
    .filter((row) => row.c && row.c[1]?.v)
    .map((row, index) => {
      const c = row.c;
      const esDestacado = parseBoolean(c[7]?.v);
      const precio = parseNumber(c[3]?.v);
      const precioAntesVal = parseNumber(c[4]?.v);

      return {
        id: c[0]?.v?.toString() || `item-${index + 1}`,
        nombre: c[1]?.v?.toString().trim() || "Sin nombre",
        categoria: c[2]?.v?.toString().trim() || "General",
        precio: precio,
        precioAntes: precioAntesVal > 0 ? precioAntesVal : null,
        descripcion: c[5]?.v || "",
        imagen:
          c[6]?.v ||
          "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800",
        destacadoPinterest: esDestacado ? "SÍ" : "NO",
        destacado: esDestacado,
        formatoPinterest:
          c[8]?.v?.toString().toLowerCase().trim() || "cuadrado",
        esOferta: parseBoolean(c[9]?.v),
      };
    });

  const ofertas = parsedMenu.reduce((acc, item) => {
    if (item.esOferta || item.categoria.toLowerCase() === "ofertas catalina") {
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
