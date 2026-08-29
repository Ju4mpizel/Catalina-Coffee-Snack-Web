import { UtensilsCrossed, ChefHat, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: UtensilsCrossed,
    title: "Eliges tu Antojo",
    description:
      "Explora nuestro menú: desde cafés de origen y bebidas frías hasta repostería horneada y tostados artesanales.",
  },
  {
    icon: ChefHat,
    title: "Lo Preparamos al Momento",
    description:
      "Extraemos tu café con precisión y alistamos tus aperitivos o postres al instante para garantizar la máxima frescura.",
  },
  {
    icon: HeartHandshake,
    title: "A tu Mesa para Disfrutar",
    description:
      "Te lo llevamos a la mesa con una sonrisa. Un ambiente cálido y cómodo listo para que vivas la experiencia Catalina.",
  },
];

export default function ProcessTimeline() {
  return (
    <section
      id="proceso"
      className="w-full bg-[#f1ede6]/80 text-[#1c1c18] py-16 sm:py-20 my-12 border-y border-[#d5c3b7]/40 relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div data-reveal className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#81542b] block mb-2">
            La Experiencia Catalina
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] font-normal">
            Del Menú a Tu Mesa
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative">
          {/* Línea conectora horizontal sutil en escritorio */}
          <div className="hidden md:block absolute top-10 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-transparent via-[#81542b]/30 to-transparent z-0" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              data-reveal
              style={{ transitionDelay: `${index * 120}ms` }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#fdf9f2] border border-[#d5c3b7]/60 shadow-sm flex items-center justify-center mb-6 group-hover:border-[#81542b] group-hover:scale-105 transition-all duration-300">
                <step.icon className="w-8 h-8 text-[#81542b]" />
                <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#81542b] text-[#fdf9f2] text-xs font-bold flex items-center justify-center shadow-sm">
                  {index + 1}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#1c1c18] mb-3">
                {step.title}
              </h3>
              <p className="font-sans text-sm text-[#51443b] leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
