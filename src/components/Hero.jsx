import { ArrowDown } from "lucide-react";
import BrandLogo from "./BrandLogo";

export default function Hero({ onExploreMenu }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <BrandLogo size="lg" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#f1ede6] border border-[#d5c3b7]/60 text-[#7c5730] text-xs font-semibold tracking-wider uppercase mb-8">
          <span>Especialidad & Repostería Artesanal</span>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#1c1c18] font-normal tracking-wide max-w-4xl mx-auto leading-[1.15] mb-6">
          Un espacio donde cada detalle se siente{" "}
          <span className="italic text-[#81542b]">
            hecho a mano
          </span>
        </h1>

        {/* Descripción */}
        <p className="font-sans text-base sm:text-xl text-[#3b2411] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Café de origen cuidadosamente tostado, repostería horneada diariamente
          y el ambiente perfecto para pausar tu día.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#81542b] hover:bg-[#6b4321] active:scale-95 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Explorar Menú Digital</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
