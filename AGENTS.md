# REGLAS Y CONTEXTO DEL PROYECTO: CATALINA COFFEE & SNACK

## 📌 Identidad de Marca y Tokens (Design System)

- **Fondo Canvas:** `#fdf9f2` (Surface Cream)
- **Contenedores/Tarjetas:** `#f1ede6` y `#ece8e1`
- **Texto Principal (Deep Roast):** `#1c1c18`
- **Acento Primario (Caramelo):** `#81542b` / `#c18c5d`
- **Fuente Serif (Títulos/Branding):** 'Libre Caslon Text', serif
- **Fuente Sans (Cuerpo/Precios):** 'Plus Jakarta Sans', sans-serif

## 🛠️ Stack Técnico

- React + Vite, Tailwind CSS v4, Framer Motion, Lucide Icons.
- Gestor de Paquetes: pnpm
- Datos: Dinámicos procesados desde `src/data/mockMenu.js` (y luego Google Sheets via `gviz/tq`).

## 🚨 Reglas de Oro para la IA

1. NUNCA hardcodear datos de productos dentro de los componentes .jsx.
2. Mantener la estética "Artisanal Warmth": sombras suaves tintadas en moka y bordes orgánicos (`rounded-xl` / `rounded-2xl`).
3. Modificar únicamente un componente a la vez.
