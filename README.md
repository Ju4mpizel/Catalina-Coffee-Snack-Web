# Catalina Coffee & Snack — Web Oficial

Sitio web oficial interactivo y catálogo autogestionable para **Catalina Coffee & Snack** (Cochabamba, Bolivia).

🌐 **Producción:** [https://catalinacoffeebolivia.com](https://catalinacoffeebolivia.com)

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 19 + Vite
- **Estilos & UI:** Tailwind CSS + Lucide Icons
- **Animaciones:** Framer Motion
- **CMS / Base de Datos:** Google Sheets API (vía GViz JSON con snapshot fallback local)
- **Despliegue & DNS:** Vercel + Cloudflare Registrar
- **SEO & Datos Estructurados:** Schema.org (`CafeOrCoffeeShop`), OpenGraph y Meta tags locales

---

## 🚀 Características Principales

- **Menú Dinámico:** Sincronización en tiempo real desde una hoja de cálculo pública de Google Sheets sin costo de base de datos.
- **Snapshot en Build-time:** Generación automática de `menuSnapshot.json` durante el build para carga instantánea y funcionamiento offline/fallback.
- **Menu Gallery (Estilo Pinterest):** Grilla asimétrica interactiva con transición automática hacia el catálogo general.
- **Diseño Responsivo:** Optimizado para dispositivos móviles con objetivos táctiles estándar (≥ 44px) y accesibilidad ARIA.

---

## 💻 Instalación y Desarrollo Local

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/ju4mpizel/catalina-coffee-snack-web.git](https://github.com/ju4mpizel/catalina-coffee-snack-web.git)
   cd catalina-coffee-snack-web
   ```
