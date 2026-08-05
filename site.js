// src/config/site.js
export const SITE_CONFIG = {
  // Reemplaza por el número real con código de país (ej. Bolivia: 5917XXXXXXXX)
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "59170000000",
  whatsappDefaultMessage:
    "¡Hola Catalina Coffee! Me gustaría hacer una consulta o pedido.",
};

export const getWhatsappUrl = (customMessage) => {
  const message = encodeURIComponent(
    customMessage || SITE_CONFIG.whatsappDefaultMessage,
  );
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
};
