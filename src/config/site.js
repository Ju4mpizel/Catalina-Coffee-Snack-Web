// Configuración central del sitio.
// El número de WhatsApp se configura en el archivo .env (VITE_WHATSAPP_NUMBER)
// o en las variables de entorno del dashboard de Vercel.

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "59177411400";

const SITE_URL = "https://catalinacoffeebolivia.com";

const DEFAULT_MESSAGE =
  "Hola Catalina Coffee, quisiera hacer un pedido";

/**
 * Información oficial del negocio. Única fuente de verdad: dirección,
 * coordenadas, horario, teléfono y enlaces de Google Maps. Si cambia algo,
 * actualízalo aquí y se reflejará en toda la web.
 */
export const BUSINESS_INFO = {
  name: "Catalina Coffee",
  address: "América Oeste #1114, entre Illapa y Runasimi",
  city: "Cochabamba",
  country: "Bolivia",
  coordinates: { lat: -17.3895, lng: -66.1568 },
  schedule: "Lunes a Domingo, 08:30 – 20:30",
  scheduleDays: "Lunes a Domingo",
  scheduleHours: "08:30 – 20:30",
  phone: "+59177411400",
  mapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=-17.3895,-66.1568",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=-17.3895,-66.1568&z=17&output=embed",
};

/**
 * Construye el enlace de WhatsApp con mensaje pre-escrito.
 * @param {string} message - Mensaje opcional (por defecto: pedido genérico).
 * @returns {string} URL completa de wa.me
 */
export function getWhatsappUrl(message = DEFAULT_MESSAGE) {
  const cleanNumber = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * URL base canónica del sitio en producción.
 * @returns {string} https://catalinacoffeebolivia.com
 */
export function getSiteUrl() {
  return SITE_URL;
}