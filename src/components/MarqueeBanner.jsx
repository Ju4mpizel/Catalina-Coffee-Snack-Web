import {
  Coffee,
  Cake,
  Sparkles,
  Utensils,
  HeartHandshake,
  CupSoda,
} from "lucide-react";

const attributes = [
  { icon: Coffee, text: "Café Especial & Tostado Ideal" },
  { icon: Cake, text: "Postres Frescos del Día" },
  { icon: Sparkles, text: "Frappés & Bebidas Frías" },
  { icon: Utensils, text: "Masitas Típicas & Salados" },
  { icon: HeartHandshake, text: "Espacio Cómodo & Acogedor" },
  { icon: CupSoda, text: "Mokas & Bebidas de Especialidad" },
];

export default function MarqueeBanner() {
  // Lista repetida para cubrir pantallas anchas (4K / monitores grandes)
  const marqueeItems = [
    ...attributes,
    ...attributes,
    ...attributes,
    ...attributes,
  ];

  return (
    <div className="relative overflow-hidden py-4 bg-[#f1ede6]/40 border-y border-[#d5c3b7]/30 select-none">
      {/* Sombra difuminada a la izquierda y derecha */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#fdf9f2] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#fdf9f2] to-transparent" />

      {/* Ticker continuo en CSS */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {marqueeItems.map((item, i) => (
          <span
            key={item.text + i}
            className="inline-flex items-center gap-2 mx-6 sm:mx-8 text-sm font-semibold text-[#51443b]"
          >
            <item.icon className="w-4 h-4 text-[#81542b] shrink-0" />
            <span className="whitespace-nowrap">{item.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
