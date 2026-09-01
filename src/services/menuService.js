import { mockMenu, mockOfertas } from "../data/mockMenu";
import menuSnapshot from "../data/menuSnapshot.json";

const SHEET_ID = import.meta.env.VITE_SHEETS_MENU_ID;

export function getInitialMenuData() {
  const hasSnapshotMenu = menuSnapshot?.menu?.length > 0;
  return {
    menu: hasSnapshotMenu ? menuSnapshot.menu : mockMenu,
    ofertas:
      menuSnapshot?.ofertas?.length > 0 ? menuSnapshot.ofertas : mockOfertas,
  };
}

const parseBoolean = (val) => {
  if (val === undefined || val === null) return false;
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === 1;
  const str = val.toString().toUpperCase().trim();
  return ["VERDADERO", "VERDAD", "SÍ", "SI", "YES", "TRUE", "1"].includes(str);
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

export async function fetchMenuData() {
  if (!SHEET_ID) {
    console.warn(
      "VITE_SHEETS_MENU_ID no está configurada en el archivo .env. Usando snapshot / datos locales.",
    );
    return getInitialMenuData();
  }

  try {
    const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&_t=${Date.now()}`;

    const response = await fetch(GVIZ_URL, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();

    const jsonString = text.substring(
      text.indexOf("{"),
      text.lastIndexOf("}") + 1,
    );
    const data = JSON.parse(jsonString);
    const rows = data.table?.rows || [];

    const parsedMenu = rows
      .filter((row) => row && row.c && row.c[1] && row.c[1].v)
      .map((row, index) => {
        const c = row.c;

        const id = c[0]?.v?.toString() || String(index + 1);
        const nombre = String(c[1]?.v || "").trim();
        const categoria = c[2]?.v?.toString().trim() || "Cafés";
        const precio = parseNumber(c[3]?.v);
        const descripcion = String(c[4]?.v || "").trim();
        const imagen =
          c[5]?.v ||
          "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format";

        const esDestacado = parseBoolean(c[6]?.v);
        const formatoPinterest =
          c[7]?.v?.toString().toLowerCase().trim() || "cuadrado";
        const disponible = c[8]?.v !== undefined ? parseBoolean(c[8]?.v) : true;
        const esOferta = parseBoolean(c[9]?.v);
        const descuento = String(c[10]?.v || "").trim();
        const precioAntesVal =
          c[11]?.v !== undefined && c[11]?.v !== null && c[11]?.v !== ""
            ? parseNumber(c[11]?.v)
            : null;
        const valido = String(c[12]?.v || "Disponible hoy").trim();

        return {
          id,
          nombre,
          categoria,
          precio,
          precioAntes: precioAntesVal,
          descripcion,
          imagen,
          destacadoPinterest: esDestacado ? "SÍ" : "NO",
          destacado: esDestacado,
          formatoPinterest,
          disponible,
          esOferta,
          descuento,
          valido,
        };
      });

    const parsedOfertas = parsedMenu.reduce((acc, item) => {
      if (
        item.esOferta ||
        item.categoria.toLowerCase() === "ofertas catalina" ||
        item.categoria.toLowerCase() === "promos"
      ) {
        acc.push({
          id: item.id,
          titulo: item.nombre,
          nombre: item.nombre,
          descuento: item.descuento || "Oferta Especial",
          descripcion: item.descripcion,
          precioAntes: item.precioAntes,
          precioOferta: item.precio,
          precio: item.precio,
          imagen: item.imagen,
          valido: item.valido,
        });
      }
      return acc;
    }, []);

    return {
      menu: parsedMenu.length > 0 ? parsedMenu : getInitialMenuData().menu,
      ofertas: parsedOfertas,
    };
  } catch (error) {
    console.error(
      "Error al conectar con Google Sheets, usando snapshot local:",
      error,
    );
    return getInitialMenuData();
  }
}
