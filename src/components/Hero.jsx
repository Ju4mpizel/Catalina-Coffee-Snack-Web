import { ArrowDown } from "lucide-react";
import catalinaCupImg from "../assets/Catalina_cup_nuevo.webp";

export default function Hero({ onExploreMenu }) {
  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-28 overflow-hidden">
      {/* Fondo a sangre completa con fade-in sutil */}
      <img
        src="/Catalina_BG.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover animate-hero-bg"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Overlay para oscurecer el fondo y destacar el texto crema */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c18]/95 via-[#1c1c18]/60 to-[#1c1c18]/40" />

      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#81542b]/20 blur-3xl rounded-full pointer-events-none hidden md:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start mb-6">
              <div
                className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#f6bb88] text-xs font-semibold tracking-wider uppercase animate-hero-rise"
                style={{ animationDelay: "80ms" }}
              >
                <span>Especialidad & Repostería Artesanal</span>
              </div>
            </div>

            <h1
              className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#fdf9f2] font-normal tracking-wide leading-[1.15] mb-6 animate-hero-rise"
              style={{ animationDelay: "160ms" }}
            >
              Creando experiencias{" "}
              <span className="italic text-[#f6bb88] block sm:inline">
                en cada momento
              </span>
            </h1>

            <p
              className="font-sans text-base sm:text-lg text-[#e6d9c8] max-w-xl mx-auto md:mx-0 leading-relaxed mb-8 font-normal animate-hero-rise"
              style={{ animationDelay: "240ms" }}
            >
              Café de origen tostado con esmero, repostería artesanal y un
              lugar pensado para pausar y disfrutar de cada instante.
            </p>

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

          <div
            className="md:col-span-5 flex justify-center items-center relative animate-hero-rise"
            style={{ animationDelay: "400ms" }}
          >
            <div className="relative w-full max-w-[160px] mx-auto my-4 md:max-w-[380px] md:my-0">
              <img
                src={catalinaCupImg}
                alt="Vaso Catalina Coffee"
                className="w-full h-auto object-contain drop-shadow-2xl animate-float"
                width="256"
                height="256"
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
