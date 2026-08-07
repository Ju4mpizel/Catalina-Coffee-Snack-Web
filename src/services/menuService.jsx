import { mockMenu, mockOfertas } from "../data/mockMenu";
import menuSnapshot from "../data/menuSnapshot.json";

// Lee la ID exclusivamente desde la variable de entorno de Vite (.env)
const SHEET_ID = import.meta.env.VITE_SHEETS_MENU_ID;

// Retorna los datos síncronos generados en build time.
// Garantiza que la app arranque con el menú completo pintado en 0ms.
export function getInitialMenuData() {
  const hasSnapshotMenu = menuSnapshot?.menu?.length > 0;
  return {
    menu: hasSnapshotMenu ? menuSnapshot.menu : mockMenu,
    ofertas:
      menuSnapshot?.ofertas?.length > 0 ? menuSnapshot.ofertas : mockOfertas,
  };
}

// Helper para convertir valores de Sheets en booleanos tolerantes a errores humanos
const parseBoolean = (val) => {
  if (val === undefined || val === null) return false;
  if (typeof val === "boolean") return val;
  if (typeof val === "number") return val === 1;
  const str = val.toString().toUpperCase().trim();
  return ["SÍ", "SI", "YES", "TRUE", "1"].includes(str);
};

// Helper para limpiar precios (distingue comas de miles vs comas decimales)
const parseNumber = (val) => {
  if (val === undefined || val === null || val === "") return 0;
  if (typeof val === "number") return val;
  const cleaned = val
    .toString()
    .trim()
    .replace(/,(?=\d{3}(?:\D|$))/g, "") // Remueve comas que actúan como separador de miles
    .replace(",", "."); // Convierte comas decimales a punto
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
        const precio = parseNumber(c[3]?.v);
        const precioAntesVal =
          c[4]?.v !== undefined && c[4]?.v !== null && c[4]?.v !== ""
            ? parseNumber(c[4]?.v)
            : null;

        const esDestacado = parseBoolean(c[7]?.v);

        return {
          id: c[0]?.v?.toString() || String(index + 1),
          nombre: c[1]?.v || "",
          categoria: c[2]?.v?.toString().trim() || "General",
          precio: precio,
          precioAntes: precioAntesVal,
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

    const parsedOfertas = parsedMenu.reduce((acc, item) => {
      if (
        item.esOferta ||
        item.categoria.toLowerCase() === "ofertas catalina"
      ) {
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

    return {
      menu: parsedMenu.length > 0 ? parsedMenu : getInitialMenuData().menu,
      ofertas:
        parsedOfertas.length > 0 ? parsedOfertas : getInitialMenuData().ofertas,
    };
  } catch (error) {
    console.error(
      "Error al conectar con Google Sheets, usando snapshot local:",
      error,
    );
    return getInitialMenuData();
  }
}
