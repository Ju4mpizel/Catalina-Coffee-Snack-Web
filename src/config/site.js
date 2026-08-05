// Configuración central del sitio.
// El número de WhatsApp se configura en el archivo .env (VITE_WHATSAPP_NUMBER)
// o en las variables de entorno del dashboard de Vercel.

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "59170000000";

const DEFAULT_MESSAGE =
  "Hola Catalina Coffee, quisiera hacer un pedido";

/**
 * Construye el enlace de WhatsApp con mensaje pre-escrito.
 * @param {string} message - Mensaje opcional (por defecto: pedido genérico).
 * @returns {string} URL completa de wa.me
 */
export function getWhatsappUrl(message = DEFAULT_MESSAGE) {
  const cleanNumber = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
