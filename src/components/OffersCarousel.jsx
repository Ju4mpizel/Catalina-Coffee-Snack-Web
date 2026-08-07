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

  const total = ofertas?.length || 0;

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    setIsPaused(false);
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Autoplay: los hooks se ejecutan SIEMPRE en el mismo orden (antes del early return)
  useEffect(() => {
    if (total === 0 || isPaused) return undefined;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 10000);
    return () => clearInterval(timer);
  }, [total, isPaused]);

  if (!ofertas || total === 0) return null;

  const current = ofertas[currentIndex % total];

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
      className="py-12 sm:py-16 bg-[#f1ede6] scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf9f2] text-[#81542b] text-xs font-semibold tracking-wide uppercase border border-[#d5c3b7]/50">
            <span>Promociones Especiales</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1c18] font-normal mt-2">
            Ofertas Catalina
          </h2>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <m.div
                key={current.id}
                custom={direction}
                variants={{
                  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-white border border-[#d5c3b7]/40 shadow-md overflow-hidden md:grid md:grid-cols-12"
              >
                <div className="md:col-span-6 h-64 md:h-96 relative overflow-hidden bg-[#fdf9f2]">
                  <img
                    src={current.imagen}
                    alt={current.titulo}
                    onError={handleImageError}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#81542b] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
                    {current.descuento}
                  </div>
                </div>

                <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-medium text-[#7c5730] mb-3">
                      {current.valido}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c18] mb-4 leading-tight">
                      {current.titulo}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-[#51443b] leading-relaxed mb-6">
                      {current.descripcion}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[#f1ede6]">
                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-sm text-[#51443b] line-through">
                        Bs. {current.precioAntes}
                      </span>
                      <span className="font-serif text-2xl font-bold text-[#81542b]">
                        Bs. {current.precioOferta}
                      </span>
                    </div>
                    <a
                      href={whatsappUrl(current.titulo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#81542b] text-[#81542b] hover:bg-[#81542b] hover:text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Pedir por WhatsApp</span>
                    </a>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={prev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-[#d5c3b7]/50 items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors shadow-xs cursor-pointer active:scale-95 backdrop-blur-none"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 border border-[#d5c3b7]/50 items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors shadow-xs cursor-pointer active:scale-95 backdrop-blur-none"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {ofertas.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                className={`rounded-full transition-all cursor-pointer ${
                  index === currentIndex
                    ? "bg-[#81542b] w-6 h-2.5"
                    : "bg-[#d5c3b7] hover:bg-[#81542b]/50 w-2.5 h-2.5"
                }`}
                aria-label={`Ir a oferta ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
