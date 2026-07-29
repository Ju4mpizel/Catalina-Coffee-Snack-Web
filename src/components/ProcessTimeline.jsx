import { m } from "framer-motion";
import { Leaf, Flame, Coffee } from "lucide-react";

const steps = [
  {
    icon: Leaf,
    title: "El Grano",
    description:
      "Seleccionamos granos 100% bolivianos de cooperativas locales en Los Yungas y Caranavi.",
  },
  {
    icon: Flame,
    title: "El Tueste",
    description:
      "Tostado artesanal en lotes peque\u00f1os para preservar el perfil de sabor \u00fanico de cada origen.",
  },
  {
    icon: Coffee,
    title: "Tu Taza",
    description:
      "Preparamos cada orden con m\u00e9todos de extracci\u00f3n precisos: V60, AeroPress o espresso.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function ProcessTimeline() {
  return (
    <section
      id="proceso"
      className="relative py-12 sm:py-16 max-w-6xl mx-auto px-6 overflow-hidden scroll-mt-24"
    >
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4a2e16] block mb-2">
          Nuestro Proceso
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] font-normal">
          Del Grano a Tu Taza
        </h2>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative"
      >
        <div className="hidden md:block absolute top-20 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-[#81542b]/30 via-[#c18c5d]/30 to-[#81542b]/30" />

        {steps.map((step, index) => (
          <m.div
            key={step.title}
            variants={stepVariants}
            className="relative flex flex-col items-center text-center"
          >
            <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-[#d5c3b7]/40 shadow-sm flex items-center justify-center mb-6">
              <step.icon className="w-7 h-7 text-[#81542b]" />
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#81542b] text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {index + 1}
              </span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1c1c18] mb-3">
              {step.title}
            </h3>
            <p className="font-sans text-sm text-[#51443b] leading-relaxed max-w-xs">
              {step.description}
            </p>
          </m.div>
        ))}
      </m.div>
    </section>
  );
}
