import { useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Menu, X, Coffee, MessageCircle } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { getWhatsappUrl } from "../config/site";

export default function Navbar({
  onNavigateHome,
  onNavigateMenu,
  currentView,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappUrl = getWhatsappUrl();

  const closeMobile = () => setIsMobileMenuOpen(false);

  const handleHomeClick = () => {
    closeMobile();
    if (currentView === "inicio") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNavigateHome();
    }
  };

  const handleMenuClick = () => {
    closeMobile();
    if (currentView === "menu") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onNavigateMenu();
    }
  };

  const handleScrollTo = (sectionId) => {
    onNavigateHome();
    closeMobile();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const navLinkClass = (isActive) =>
    `text-sm font-semibold tracking-wide transition-colors cursor-pointer relative py-1 ${
      isActive
        ? "text-[#81542b]"
        : "text-[#51443b] hover:text-[#81542b]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#fdf9f2]/95 border-b border-[#d5c3b7]/40 shadow-sm [transform:translateZ(0)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-3">
        <div className="shrink-0">
          <BrandLogo
            size="md"
            onClick={handleHomeClick}
            ariaLabel="Catalina Coffee - Página de inicio"
          />
        </div>

        {/* Nav de escritorio (solo desde lg) */}
        <nav className="hidden lg:flex justify-center items-center gap-4 xl:gap-6 flex-1 min-w-0">
          <button type="button" onClick={handleHomeClick} className={navLinkClass(currentView === "inicio")}>
            Inicio
            {currentView === "inicio" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#81542b] rounded-full animate-fade-in" />
            )}
          </button>
          <button type="button" onClick={() => handleScrollTo("ofertas")} className={navLinkClass(false)}>
            Ofertas
          </button>
          <button type="button" onClick={() => handleScrollTo("about")} className={navLinkClass(false)}>
            Nosotros
          </button>
          <button type="button" onClick={() => handleScrollTo("testimonios")} className={navLinkClass(false)}>
            Testimonios
          </button>
          <button type="button" onClick={() => handleScrollTo("location")} className={navLinkClass(false)}>
            Ubicación
          </button>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#81542b] hover:text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full border border-[#81542b] hover:bg-[#81542b] transition-all duration-200 hover:-translate-y-0.5 active:scale-95 min-h-11 sm:min-h-0"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            <span>Contáctanos</span>
          </a>

          <button
            type="button"
            onClick={handleMenuClick}
            className="flex items-center bg-[#81542b] hover:bg-[#6b4321] active:scale-95 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer min-h-11 sm:min-h-0"
          >
            <span>Menú</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={
              isMobileMenuOpen ? "Cerrar Menú" : "Abrir Menú"
            }
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className={`lg:hidden p-3 rounded-xl text-[#1c1c18] hover:bg-[#f1ede6] active:scale-90 transition-all duration-300 cursor-pointer ${
              isMobileMenuOpen ? "rotate-90" : "rotate-0"
            }`}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Drawer móvil animado solo con opacity/transform (GPU) */}
        <AnimatePresence>
        {isMobileMenuOpen && (
          <m.div
            key="mobile-drawer"
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-0 w-full z-50 lg:hidden bg-[#fdf9f2]/98 shadow-xl border-b border-[#d5c3b7]/30 overflow-y-auto will-change-transform max-h-[calc(100dvh-5rem)]"
            style={{ transformOrigin: "top" }}
          >
        <div className="px-6 py-6 space-y-1">
          <button
            type="button"
            onClick={handleHomeClick}
            className={`block w-full text-left text-base font-semibold py-3 px-4 rounded-xl transition-colors duration-200 active:scale-[0.99] ${
              currentView === "inicio"
                ? "bg-[#f1ede6] text-[#81542b]"
                : "text-[#51443b] hover:bg-[#f1ede6]"
            }`}
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("ofertas")}
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors duration-200 active:scale-[0.99]"
          >
            Ofertas
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("about")}
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors duration-200 active:scale-[0.99]"
          >
            Nosotros
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("testimonios")}
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors duration-200 active:scale-[0.99]"
          >
            Testimonios
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("location")}
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors duration-200 active:scale-[0.99]"
          >
            Ubicación
          </button>

          <div className="pt-4 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-[#81542b] text-[#81542b] hover:bg-[#81542b] hover:text-white text-sm font-semibold py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={handleMenuClick}
              className="flex items-center justify-center gap-2 w-full bg-[#81542b] hover:bg-[#6b4321] active:scale-95 text-white text-sm font-semibold py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
            >
              <Coffee className="w-4 h-4" />
              <span>Ver Menú Interactivo</span>
            </button>
          </div>
        </div>
        </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
