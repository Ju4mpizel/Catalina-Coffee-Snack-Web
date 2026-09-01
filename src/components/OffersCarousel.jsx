import { useState, useEffect, useRef } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { getWhatsappUrl } from "../config/site";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format";

export default function OffersCarousel({ ofertas }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const safeOfertas = Array.isArray(ofertas) ? ofertas.filter(Boolean) : [];
  const total = safeOfertas.length;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    if (total <= 1 || isPaused) return undefined;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 10000);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (!safeOfertas || total === 0) return null;

  const current = safeOfertas[currentIndex % total] || {};
  const tituloProducto = current.titulo || current.nombre || "Oferta Especial";
  const precioFinal = current.precioOferta ?? current.precio ?? 0;

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goTo = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const whatsappUrl = (titulo) =>
    getWhatsappUrl(`Hola Catalina Coffee, quiero la oferta: ${titulo}`);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <section
      id="ofertas"
      data-reveal
      className="py-12 sm:py-16 bg-[#f1ede6] scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf9f2] text-[#81542b] text-xs font-semibold tracking-wide uppercase border border-[#d5c3b7]/50">
            <span>Promociones Especiales</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1c18] font-normal mt-2">
            Ofertas Catalina
          </h2>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl bg-white border border-[#d5c3b7]/40 shadow-md h-[520px] sm:h-[490px] md:h-[390px]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={current.id || `oferta-${currentIndex}`}
                custom={direction}
                variants={{
                  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full flex flex-col md:grid md:grid-cols-2 overflow-hidden"
              >
                {/* 1. Lado Imagen */}
                <div className="relative w-full h-[45%] md:h-full overflow-hidden bg-[#fdf9f2] shrink-0">
                  <img
                    src={current.imagen || FALLBACK_IMAGE}
                    alt={tituloProducto}
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  {current.descuento && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#81542b] text-white text-[11px] sm:text-xs font-bold px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                      {current.descuento}
                    </div>
                  )}
                </div>

                {/* 2. Lado Contenido */}
                <div className="w-full h-[55%] md:h-full p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col justify-between overflow-hidden">
                  <div className="overflow-hidden">
                    <div className="text-[11px] sm:text-xs font-medium text-[#7c5730] mb-1.5 sm:mb-2 truncate">
                      {current.valido || "Disponible hoy"}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#1c1c18] mb-2 sm:mb-3 leading-snug line-clamp-2">
                      {tituloProducto}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm md:text-base text-[#51443b] leading-relaxed line-clamp-3">
                      {current.descripcion}
                    </p>
                  </div>

                  {/* 3. Precios y Botón fijados abajo */}
                  <div className="pt-3 sm:pt-4 border-t border-[#f1ede6] shrink-0">
                    <div className="flex items-baseline gap-2.5 mb-3 sm:mb-4">
                      {current.precioAntes && (
                        <span className="text-xs sm:text-sm text-[#51443b]/70 line-through">
                          Bs. {current.precioAntes}
                        </span>
                      )}
                      <span className="font-serif text-xl sm:text-2xl font-bold text-[#81542b]">
                        Bs. {precioFinal}
                      </span>
                    </div>
                    <a
                      href={whatsappUrl(tituloProducto)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#81542b] text-[#81542b] hover:bg-[#81542b] hover:text-white text-xs sm:text-sm font-semibold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Pedir por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          {/* Flechas Desktop */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 border border-[#d5c3b7]/50 items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors shadow-sm cursor-pointer active:scale-95"
                aria-label="Anterior oferta"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 border border-[#d5c3b7]/50 items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors shadow-sm cursor-pointer active:scale-95"
                aria-label="Siguiente oferta"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Paginación */}
          {total > 1 &&
            (total <= 6 ? (
              <div className="flex items-center justify-center flex-wrap gap-1 mt-5 max-w-full">
                {safeOfertas.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goTo(index)}
                    className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                    aria-label={`Ir a oferta ${index + 1}`}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? "bg-[#81542b] w-6 h-2"
                          : "bg-[#d5c3b7] hover:bg-[#81542b]/50 w-2 h-2"
                      }`}
                    />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  type="button"
                  onClick={prev}
                  className="w-9 h-9 rounded-full bg-white border border-[#d5c3b7]/50 flex md:hidden items-center justify-center text-[#51443b] active:scale-95"
                  aria-label="Oferta anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="px-4 py-1.5 rounded-full bg-white border border-[#d5c3b7]/50 text-xs font-semibold text-[#81542b] shadow-xs">
                  {currentIndex + 1} de {total}
                </div>
                <button
                  type="button"
                  onClick={next}
                  className="w-9 h-9 rounded-full bg-white border border-[#d5c3b7]/50 flex md:hidden items-center justify-center text-[#51443b] active:scale-95"
                  aria-label="Siguiente oferta"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
