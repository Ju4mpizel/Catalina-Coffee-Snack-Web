import React from "react";
import BrandLogo from "./BrandLogo";

export default function Footer({ onNavigateHome, onNavigateMenu }) {
  return (
    <footer className="bg-[#f1ede6] border-t border-[#d5c3b7]/40 py-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        {/* Logo en versión grande */}
        <BrandLogo
          size="md"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Links Rápidos */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold text-[#51443b]">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#81542b] transition-colors cursor-pointer"
          >
            Inicio
          </button>
          <button
            type="button"
            onClick={onNavigateMenu}
            className="hover:text-[#81542b] transition-colors cursor-pointer"
          >
            Menú Digital
          </button>
          <a
            href="https://wa.me/59170000000"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#81542b] transition-colors"
          >
            Contacto
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#51443b]">
          © {new Date().getFullYear()} Catalina Coffee & Snack. Cochabamba,
          Bolivia.
        </p>
      </div>
    </footer>
  );
}
