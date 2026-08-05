import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mar\u00eda G.",
    text: "El mejor caf\u00e9 de especialidad en Cochabamba. El V60 de los Andes es simplemente espectacular.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    text: "Trabajo desde aqu\u00ed casi todos los d\u00edas. El ambiente es perfecto y el croissant de almendras, imperdible.",
    rating: 5,
  },
  {
    name: "Andrea P.",
    text: "Los pasteles son horneados diariamente y se nota. El combo caf\u00e9 + brownie es mi ritual de las tardes.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const variants = {
    enter: (dir) => ({ x: dir * 60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir * -60, opacity: 0 }),
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonios"
      data-reveal
      className="relative py-12 sm:py-16 max-w-6xl mx-auto px-6 overflow-hidden scroll-mt-24"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4a2e16] block mb-2">
          Opiniones
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-4 font-normal">
          Lo Que Dicen Nuestros Clientes
        </h2>
      </div>

      <div className="max-w-2xl mx-auto relative">
        <div className="relative min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <m.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-md border border-[#d5c3b7]/40 text-center w-full"
            >
              <Quote className="w-8 h-8 text-[#81542b]/20 mx-auto mb-4" />
              <p className="font-serif text-lg md:text-xl text-[#1c1c18] leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 text-[#f6bb88] mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-sans text-sm font-semibold text-[#81542b]">
                {t.name}
              </span>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={prev}
            className="w-9 h-9 rounded-full bg-white border border-[#d5c3b7]/50 flex items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors duration-200 shadow-xs cursor-pointer active:scale-90"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-[#81542b] w-5"
                    : "bg-[#d5c3b7] hover:bg-[#81542b]/40"
                }`}
                type="button"
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-9 h-9 rounded-full bg-white border border-[#d5c3b7]/50 flex items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors duration-200 shadow-xs cursor-pointer active:scale-90"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
