import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero({ onExploreMenu }) {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        {/* Badge Superior */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1ede6] border border-[#d5c3b7]/60 text-[#7c5730] text-xs font-semibold tracking-wider uppercase mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#81542b]" />
          <span>Especialidad & Repostería Artesanal</span>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#1c1c18] font-normal tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
          Un espacio donde cada detalle se siente{" "}
          <span className="italic font-normal text-[#81542b]">
            hecho a mano
          </span>
        </h1>

        {/* Subtítulo */}
        <p className="font-sans text-base sm:text-xl text-[#51443b] max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Café de origen cuidadosamente tostado, repostería horneada diariamente
          y el ambiente perfecto para pausar tu día.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#81542b] hover:bg-[#6b4321] text-white font-semibold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Explorar Menú Digital</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
