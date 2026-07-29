import React, { useState } from "react";
import { Menu, X, Coffee, MessageCircle } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Navbar({
  onNavigateHome,
  onNavigateMenu,
  currentView,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappUrl =
    "https://wa.me/59170000000?text=Hola%20Catalina%20Coffee,%20quisiera%20hacer%20un%20pedido";

  const closeMobile = () => setIsMobileMenuOpen(false);

  const handleHomeClick = () => {
    onNavigateHome();
    closeMobile();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMenuClick = () => {
    onNavigateMenu();
    closeMobile();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (sectionId) => {
    onNavigateHome();
    closeMobile();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleScrollToUbicacion = () => {
    onNavigateHome();
    closeMobile();
    setTimeout(() => {
      const sections = document.querySelectorAll("section");
      for (const section of sections) {
        if (section.textContent.includes("Ven a Visitarnos")) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
          break;
        }
      }
    }, 50);
  };

  const navLinkClass = (isActive) =>
    `text-sm font-semibold tracking-wide transition-colors cursor-pointer relative py-1 ${
      isActive
        ? "text-[#81542b]"
        : "text-[#51443b] hover:text-[#81542b]"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#fdf9f2]/95 border-b border-[#d5c3b7]/40 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between md:grid md:grid-cols-3">
        {/* Logo */}
        <BrandLogo size="md" onClick={handleHomeClick} />

        {/* Desktop Nav */}
        <nav className="hidden md:flex justify-center items-center gap-8">
          <button type="button" onClick={handleHomeClick} className={navLinkClass(currentView === "inicio")}>
            Inicio
            {currentView === "inicio" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#81542b] rounded-full" />
            )}
          </button>
          <button type="button" onClick={() => handleScrollTo("ofertas")} className={navLinkClass(false)}>
            Ofertas
          </button>
          <button type="button" onClick={() => handleScrollTo("about")} className={navLinkClass(false)}>
            Nosotros
          </button>
          <button type="button" onClick={handleScrollToUbicacion} className={navLinkClass(false)}>
            Ubicación
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3 md:justify-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#81542b] hover:text-white text-sm font-semibold px-3 sm:px-4 py-2 rounded-full border border-[#81542b] hover:bg-[#81542b] transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={handleMenuClick}
            className="flex items-center gap-2 bg-[#81542b] hover:bg-[#6b4321] active:scale-95 text-white text-sm font-semibold px-4 sm:px-5 py-2 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Coffee className="w-4 h-4" />
            <span className="hidden sm:inline">Ver Menú</span>
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#1c1c18] hover:bg-[#f1ede6] transition-colors cursor-pointer"
            aria-label="Abrir Menú"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdf9f2] border-b border-[#d5c3b7]/40 px-6 py-6 space-y-1 shadow-xl">
          <button
            type="button"
            onClick={handleHomeClick}
            className={`block w-full text-left text-base font-semibold py-3 px-4 rounded-xl transition-colors ${
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
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors"
          >
            Ofertas
          </button>
          <button
            type="button"
            onClick={() => handleScrollTo("about")}
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors"
          >
            Nosotros
          </button>
          <button
            type="button"
            onClick={handleScrollToUbicacion}
            className="block w-full text-left text-base font-semibold py-3 px-4 rounded-xl text-[#51443b] hover:bg-[#f1ede6] transition-colors"
          >
            Ubicación
          </button>

          <div className="pt-4 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border border-[#81542b] text-[#81542b] hover:bg-[#81542b] hover:text-white text-sm font-semibold py-3 rounded-full transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={handleMenuClick}
              className="flex items-center justify-center gap-2 w-full bg-[#81542b] hover:bg-[#6b4321] active:scale-95 text-white text-sm font-semibold py-3 rounded-full transition-all cursor-pointer"
            >
              <Coffee className="w-4 h-4" />
              <span>Ver Menú Interactivo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
