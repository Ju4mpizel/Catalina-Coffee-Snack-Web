import { ArrowDown } from "lucide-react";
import catalinaCupImg from "../assets/Catalina_cup.webp";

export default function Hero({ onExploreMenu }) {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-28 overflow-hidden">
      {/* Resplandor cálido detrás del vaso */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#81542b]/10 blur-3xl rounded-full pointer-events-none hidden md:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          {/* COLUMNA IZQUIERDA: TEXTO Y BOTÓN */}
          <div className="md:col-span-7 text-center md:text-left">
            {/* Badge */}
            <div className="flex flex-col items-center md:items-start mb-6">
              <div
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#f1ede6] border border-[#d5c3b7]/60 text-[#7c5730] text-xs font-semibold tracking-wider uppercase animate-hero-rise"
                style={{ animationDelay: "80ms" }}
              >
                <span>Especialidad & Repostería Artesanal</span>
              </div>
            </div>

            {/* Título Principal */}
            <h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1c1c18] font-normal tracking-wide leading-[1.15] mb-6 animate-hero-rise"
              style={{ animationDelay: "160ms" }}
            >
              Un espacio donde cada detalle se siente{" "}
              <span className="italic text-[#81542b] block sm:inline">
                hecho a mano
              </span>
            </h1>

            {/* Descripción */}
            <p
              className="font-sans text-base sm:text-lg text-[#3b2411] max-w-xl mx-auto md:mx-0 leading-relaxed mb-8 font-normal animate-hero-rise"
              style={{ animationDelay: "240ms" }}
            >
              Café de origen cuidadosamente tostado, repostería horneada
              diariamente y el ambiente perfecto para pausar tu día.
            </p>

            {/* Botón de Acción */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 animate-hero-rise"
              style={{ animationDelay: "320ms" }}
            >
              <button
                type="button"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#81542b] hover:bg-[#6b4321] active:scale-95 text-white font-semibold text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Explorar Menú Digital</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: VASO DE CAFÉ EN LEVITACIÓN */}
          <div
            className="md:col-span-5 flex justify-center items-center relative animate-hero-rise"
            style={{ animationDelay: "400ms" }}
          >
            <div className="relative w-full max-w-[160px] mx-auto my-4 md:max-w-[380px] md:my-0">
              <img
                src={catalinaCupImg}
                alt="Vaso Catalina Coffee"
                className="w-full h-auto object-contain drop-shadow-2xl animate-float"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
