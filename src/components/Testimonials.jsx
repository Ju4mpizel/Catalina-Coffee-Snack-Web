import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Valeria Morales",
    role: "Cliente frecuente",
    text: "Un lugar súper tranquilo y relajante para pasar la tarde o venir a charlar un rato. El cappuccino con leche vegetal me salvó el día, 10/10 la atención.",
    rating: 5,
  },
  {
    name: "Andrés Colque",
    role: "Amante del café de especialidad",
    text: "Me encantaron las tortas, ¡tienen tantos sabores que uno nunca sabe cuál elegir! El cheesecake y el moka helado son adictivos.",
    rating: 5,
  },
  {
    name: "Camila Fernandez",
    role: "Trabajo remoto",
    text: "El ambiente es hermoso y súper acogedor. La música está al volumen perfecto para leer o trabajar mientras te tomas algo rico.",
    rating: 5,
  },
  {
    name: "Diego Ramos",
    role: "Visita de fin de semana",
    text: "Los combos mañaneros están muy bien servidos y el pan siempre sale fresco y crujiente. Definitivamente se volvió nuestra parada fija de los sábados.",
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
        <div className="relative min-h-[300px] sm:min-h-[280px]">
          <AnimatePresence mode="wait" custom={direction}>
            <m.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 bg-white rounded-3xl shadow-md border border-[#d5c3b7]/40 overflow-hidden"
            >
              <div className="h-full flex flex-col items-center justify-center p-6 md:p-10 text-center">
                <Quote className="w-8 h-8 text-[#81542b]/20 mx-auto mb-4 shrink-0" />
                <p className="font-serif text-lg md:text-xl text-[#1c1c18] leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 text-[#f6bb88] mb-3 shrink-0">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="flex flex-col items-center gap-0.5 shrink-0">
                  <span className="font-sans text-sm font-semibold text-[#81542b]">
                    {t.name}
                  </span>
                  <span className="font-sans text-xs text-[#51443b]/80">
                    {t.role}
                  </span>
                </div>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white border border-[#d5c3b7]/50 flex items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors duration-200 shadow-xs cursor-pointer active:scale-90"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => goTo(i)}
                className="relative flex items-center justify-center -m-[18px] p-[18px] cursor-pointer active:scale-90 transition-transform"
                type="button"
                aria-label={`Testimonio ${i + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-[#81542b] w-5 h-2"
                      : "bg-[#d5c3b7] w-2 h-2 hover:bg-[#81542b]/40"
                  }`}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="w-11 h-11 rounded-full bg-white border border-[#d5c3b7]/50 flex items-center justify-center text-[#51443b] hover:bg-[#81542b] hover:text-white transition-colors duration-200 shadow-xs cursor-pointer active:scale-90"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
