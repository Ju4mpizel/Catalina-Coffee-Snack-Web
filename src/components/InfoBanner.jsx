import { m } from "framer-motion";
import { Coffee, Leaf, Sparkles } from "lucide-react";

const infoItems = [
  {
    icon: Coffee,
    title: "Leches Vegetales",
    text: "Disponibles de Almendra y Soya sin recargo adicional.",
  },
  {
    icon: Leaf,
    title: "Opciones Veganas",
    text: "Consulta por nuestras alternativas veganas y sin gluten.",
  },
  {
    icon: Sparkles,
    title: "Horneado Diario",
    text: "Reposter\u00eda artesanal preparada cada ma\u00f1ana.",
  },
];

export default function InfoBanner() {
  return (
    <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6">
      <m.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-[#fdf9f2]/90 border border-[#d5c3b7]/40 rounded-2xl p-5 sm:p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {infoItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 sm:justify-center sm:text-center sm:flex-col sm:items-center"
            >
              <div className="w-9 h-9 rounded-xl bg-[#81542b]/10 flex items-center justify-center shrink-0 sm:mx-auto">
                <item.icon className="w-4.5 h-4.5 text-[#81542b]" />
              </div>
              <div>
                <span className="font-semibold text-[#1c1c18] text-sm block">
                  {item.title}
                </span>
                <span className="text-xs text-[#51443b] leading-relaxed">
                  {item.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </m.div>
    </section>
  );
}
