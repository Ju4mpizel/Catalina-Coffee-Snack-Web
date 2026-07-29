import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tag,
  ChevronLeft,
  ChevronRight,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function OffersCarousel({ ofertas, onGoToOffersMenu }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Guardamos la dirección de la animación: 1 para adelante, -1 para atrás
  const [direction, setDirection] = useState(1);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? ofertas.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === ofertas.length - 1 ? 0 : prev + 1));
  };

  // Autoplay pausado a 8 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === ofertas.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, [ofertas.length]);

  if (!ofertas || ofertas.length === 0) return null;

  const current = ofertas[currentIndex];

  // Variantes de animación fluida para Framer Motion
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 bg-[#f1ede6] border-y border-[#d5c3b7]/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header de la Sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#fdf9f2] text-[#81542b] text-xs font-semibold tracking-wide uppercase mb-3 border border-[#d5c3b7]/50">
              <Tag className="w-3.5 h-3.5 text-[#81542b]" />
              <span>Promociones Especiales</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1c1c18]">
              Ofertas Catalina
            </h2>
          </div>

          {/* Controles de Navegación Manual */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white border border-[#d5c3b7]/60 flex items-center justify-center text-[#1c1c18] hover:bg-[#81542b] hover:text-white transition-colors shadow-xs cursor-pointer active:scale-95"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold text-[#7c5730] px-2">
              {currentIndex + 1} / {ofertas.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white border border-[#d5c3b7]/60 flex items-center justify-center text-[#1c1c18] hover:bg-[#81542b] hover:text-white transition-colors shadow-xs cursor-pointer active:scale-95"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contenedor Animado de la Tarjeta */}
        <div className="relative min-h-[420px] md:min-h-[380px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1], // Curva de aceleración natural
              }}
              className="bg-white rounded-3xl overflow-hidden border border-[#d5c3b7]/50 shadow-md grid grid-cols-1 md:grid-cols-12 items-center w-full"
            >
              {/* Imagen de la Oferta */}
              <div className="md:col-span-6 h-64 md:h-96 relative overflow-hidden">
                <img
                  src={current.imagen}
                  alt={current.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#81542b] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                  {current.descuento}
                </div>
              </div>

              {/* Contenido de la Oferta */}
              <div className="md:col-span-6 p-8 md:p-12 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#7c5730] mb-3">
                    <Clock className="w-4 h-4 text-[#81542b]" />
                    <span>{current.valido}</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1c18] mb-4">
                    {current.titulo}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#51443b] leading-relaxed mb-6">
                    {current.descripcion}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#f1ede6] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#51443b] line-through block">
                      Antes: Bs. {current.precioAntes}
                    </span>
                    <span className="font-serif text-2xl font-bold text-[#81542b]">
                      Bs. {current.precioOferta}
                    </span>
                  </div>

                  <button
                    onClick={onGoToOffersMenu}
                    className="flex items-center gap-2 bg-[#81542b] hover:bg-[#6b4321] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all shadow-xs hover:shadow-md cursor-pointer active:scale-95"
                  >
                    <span>Ver en Menú</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
