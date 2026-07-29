import React, { useState } from "react";
import { MessageCircle, Menu, X, Sparkles } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Navbar({
  onNavigateHome,
  onNavigateMenu,
  currentView,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappUrl =
    "https://wa.me/59170000000?text=Hola%20Catalina%20Coffee,%20quisiera%20hacer%20un%20pedido";

  const handleHomeClick = () => {
    onNavigateHome();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMenuClick = () => {
    onNavigateMenu();
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#fdf9f2]/90 border-b border-[#d5c3b7]/40 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Branding / Logo Oficial */}
        <BrandLogo size="md" onClick={handleHomeClick} />

        {/* Links de Navegación Escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={handleHomeClick}
            className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 ${
              currentView === "inicio"
                ? "text-[#81542b]"
                : "text-[#51443b] hover:text-[#81542b]"
            }`}
          >
            <span>Inicio</span>
            {currentView === "inicio" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#81542b] rounded-full" />
            )}
          </button>

          <button
            onClick={handleMenuClick}
            className={`text-sm font-semibold transition-colors cursor-pointer relative py-1 flex items-center gap-1.5 ${
              currentView === "menu"
                ? "text-[#81542b]"
                : "text-[#51443b] hover:text-[#81542b]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#81542b]" />
            <span>Menú Interactivo</span>
            {currentView === "menu" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#81542b] rounded-full" />
            )}
          </button>
        </nav>

        {/* Botón WhatsApp & Toggle Móvil */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#81542b] hover:bg-[#6b4321] text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Pedir por WhatsApp</span>
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#1c1c18] hover:bg-[#f1ede6] transition-colors cursor-pointer"
            aria-label="Abrir Menú"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#fdf9f2] border-b border-[#d5c3b7]/40 px-6 py-6 space-y-4 shadow-xl">
          <button
            onClick={handleHomeClick}
            className={`block w-full text-left text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
              currentView === "inicio"
                ? "bg-[#f1ede6] text-[#81542b]"
                : "text-[#51443b]"
            }`}
          >
            Inicio
          </button>

          <button
            onClick={handleMenuClick}
            className={`flex items-center gap-2 w-full text-left text-base font-semibold py-2 px-3 rounded-xl transition-colors ${
              currentView === "menu"
                ? "bg-[#f1ede6] text-[#81542b]"
                : "text-[#51443b]"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#81542b]" />
            <span>Menú Interactivo (Pinterest)</span>
          </button>

          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#81542b] text-white text-sm font-semibold py-3 rounded-full shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
