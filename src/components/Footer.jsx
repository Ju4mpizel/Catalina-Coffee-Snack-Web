import { MessageCircle, MapPin, Clock, Heart } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { getWhatsappUrl } from "../config/site";

const WHATSAPP_URL = getWhatsappUrl();
const TIKTOK_URL = "https://www.tiktok.com/@catalina.coffee0";
const SOCIAL_HANDLE = "@catalina.coffee0";

function TikTokIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

export default function Footer({ onNavigateHome, onNavigateMenu }) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goHomeTo = (sectionId) => {
    onNavigateHome();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  const goMenu = () => {
    onNavigateMenu();
    scrollTop();
  };

  const navLinks = [
    { label: "Inicio", onClick: () => { onNavigateHome(); scrollTop(); } },
    { label: "Ofertas", onClick: () => goHomeTo("ofertas") },
    { label: "Nosotros", onClick: () => goHomeTo("about") },
    { label: "Menú Digital", onClick: goMenu },
    { label: "Ubicación", onClick: () => goHomeTo("location") },
  ];

  const socials = [
    {
      label: "TikTok",
      href: TIKTOK_URL,
      icon: <TikTokIcon className="w-4 h-4" />,
    },
    {
      label: "WhatsApp",
      href: WHATSAPP_URL,
      icon: <MessageCircle className="w-4 h-4 fill-current" />,
    },
  ];

  return (
    <footer className="relative w-full shrink-0 bg-[#1c1c18] text-[#fdf9f2]">
      {/* Hilo cálido superior */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c18c5d]/50 to-transparent" />

      {/* Brillo de tueste sutil */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-[radial-gradient(ellipse_at_top,rgba(193,140,93,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-8 md:py-16">
        {/* Columna principal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-start gap-5">
            <BrandLogo
              logoUrl="/logo_white.svg"
              size="footer"
              onClick={scrollTop}
              ariaLabel="Volver al inicio"
              loading="lazy"
            />
          </div>

          {/* Navegación */}
          <nav aria-label="Enlaces del pie de página">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c18c5d] mb-5">
              Explorar
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={link.onClick}
                    className="text-xs sm:text-sm text-[#c9bfb0] hover:text-[#f6bb88] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Ubicación y horarios */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c18c5d] mb-5">
              Visítanos
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c18c5d] shrink-0 mt-0.5" />
                <span className="text-[#c9bfb0]">Cochabamba, Bolivia</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#c18c5d] shrink-0 mt-0.5" />
                <div className="text-[#c9bfb0]">
                  <p>Lunes a Sábado</p>
                  <p className="text-[#fdf9f2] font-semibold tabular-nums">
                    08:30 &ndash; 20:30
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contacto y redes */}
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c18c5d] mb-5">
              Hablemos
            </h3>
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Seguir en ${social.label}`}
                      className="w-11 h-11 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[#fdf9f2] hover:bg-[#c18c5d] hover:text-[#1c1c18] hover:border-transparent hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="text-xs text-[#9f978c] mt-3">{SOCIAL_HANDLE}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-xs text-center text-[#9f978c]">
          <p>
            &copy; {new Date().getFullYear()} Catalina Coffee &amp; Snack
            &mdash; Cochabamba, Bolivia
          </p>
          <p className="flex items-center gap-1.5">
            Hecho a mano, todos los días.
            <Heart className="w-3 h-3 text-[#c18c5d] fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
}
