import { mockMenu, mockOfertas } from "../data/mockMenu";

// PEGA AQUÍ TU ID DE GOOGLE SHEETS
const SHEET_ID = "1wEBjZCbdi3tY_sS3p4a17GjqM0Sg6R2OzAnFY8UuWTI";

const GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
const CACHE_KEY = "catalina_menu_cache:v1";
const CACHE_TTL = 1 * 60 * 1000; // Reducido a 1 MINUTO para cambios casi inmediatos

export async function fetchMenuData() {
  // 1. Si no hay ID válido, retornar datos de prueba locales
  if (!SHEET_ID || SHEET_ID === "TU_SPREADSHEET_ID_AQUI") {
    return { menu: mockMenu, ofertas: mockOfertas };
  }

  // 2. Comprobar memoria local (Caché rápido de 1 min)
  try {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { timestamp, menu, ofertas } = JSON.parse(cachedData);
      const isExpired = Date.now() - timestamp > CACHE_TTL;

      // Si el caché aún es reciente (menos de 1 minuto), devolver de inmediato
      if (!isExpired && menu && menu.length > 0) {
        return { menu, ofertas };
      }
    }
  } catch (e) {
    console.warn("Error leyendo memoria local:", e);
  }

  // 3. Consultar a Google Sheets (Si pasó más de 1 minuto o no hay caché)
  try {
    const response = await fetch(GVIZ_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();

    // Limpiar respuesta JSON de Google Visualization API
    const jsonString = text.substring(47, text.length - 2);
    const data = JSON.parse(jsonString);
    const rows = data.table.rows;

    const parsedMenu = rows.map((row, index) => {
      const c = row.c;
      return {
        id: c[0]?.v?.toString() || String(index + 1),
        nombre: c[1]?.v || "",
        categoria: c[2]?.v || "General",
        precio: Number(c[3]?.v) || 0,
        precioAntes: c[4]?.v ? Number(c[4]?.v) : null,
        descripcion: c[5]?.v || "",
        imagen:
          c[6]?.v ||
          "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800",
        destacadoPinterest: c[7]?.v?.toString().toUpperCase().trim() || "NO",
        formatoPinterest:
          c[8]?.v?.toString().toLowerCase().trim() || "cuadrado",
        esOferta:
          c[9]?.v?.toString().toUpperCase().trim() === "SÍ" || c[9]?.v === true,
      };
    });

    const parsedOfertas = parsedMenu.reduce((acc, item) => {
      if (item.esOferta || item.categoria.toLowerCase() === "ofertas catalina") {
        acc.push({
          id: item.id,
          titulo: item.nombre,
          descuento: "Oferta",
          descripcion: item.descripcion,
          precioAntes: item.precioAntes || item.precio + 10,
          precioOferta: item.precio,
          imagen: item.imagen,
          valido: "Disponible Hoy",
        });
      }
      return acc;
    }, []);

    const result = {
      menu: parsedMenu,
      ofertas: parsedOfertas.length > 0 ? parsedOfertas : mockOfertas,
    };

    // Guardar los datos nuevos en la memoria local
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        ...result,
      }),
    );

    return result;
  } catch (error) {
    console.error(
      "Error al conectar con Google Sheets, usando datos locales:",
      error,
    );
    return { menu: mockMenu, ofertas: mockOfertas };
  }
}
