// src/components/MenuGallery.jsx
import { Sparkles } from "lucide-react";

// URL de imagen de respaldo por defecto si el enlace en Sheets está roto
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1534778101976-62847782c213?w=800";

export default function MenuGallery({ items, onItemClick }) {
  // Guard defensivo (items || []) + filtro normalizado
  const safeItems = items || [];
  const featuredItems = safeItems.filter(
    (item) => item.destacadoPinterest === "SÍ" || item.destacado === true,
  );

  // Diccionario de clases Tailwind según lo que escribas en la columna I del Sheets
  const formatMap = {
    largo: "aspect-[2/3]",
    alto: "aspect-[3/4]",
    vertical: "aspect-[4/5]",
    cuadrado: "aspect-square",
    horizontal: "aspect-[4/3]",
  };

  // Función controladora para imágenes rotas
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <section className="py-12 sm:py-16 max-w-5xl mx-auto px-3 sm:px-6">
      <div className="text-center mb-8 sm:mb-12 animate-view-enter">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1ede6] text-[#81542b] text-xs font-semibold tracking-wide uppercase mb-3 border border-[#d5c3b7]/50">
          <Sparkles className="w-3.5 h-3.5 text-[#81542b]" />
          <span>Inspiración Visual</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-3">
          Mural de Sabores
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#51443b] max-w-md mx-auto">
          Una galería de nuestros favoritos. Haz clic en cualquier foto para ir
          directo a su posición en el menú.
        </p>
      </div>

      {featuredItems.length === 0 ? (
        <p className="text-center text-sm text-[#51443b]">
          Las fotos de nuestros favoritos llegan pronto.
        </p>
      ) : (
        <div className="columns-2 lg:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
          {featuredItems.map((item, index) => {
            const aspectClass =
              formatMap[item.formatoPinterest] || "aspect-square";

            return (
              <article
                key={item.id}
                role="button"
                tabIndex={0}
                data-reveal
                style={{ transitionDelay: `${Math.min(index, 8) * 60}ms` }}
                onClick={() => onItemClick?.(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onItemClick?.(item);
                  }
                }}
                className={`relative group cursor-pointer break-inside-avoid w-full mb-3 sm:mb-6 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f1ede6] border border-[#d5c3b7]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98] ${aspectClass}`}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  onError={handleImageError}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover rounded-2xl sm:rounded-3xl group-hover:scale-105 transition-transform duration-700 ease-out bg-[#f1ede6]"
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 sm:px-5 pt-8 sm:pt-14 pb-2.5 sm:pb-5">
                  <span className="block text-[8px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-[#f6bb88] mb-0.5 sm:mb-1">
                    {item.categoria}
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-0.5 sm:gap-3">
                    <h3 className="font-serif text-xs sm:text-xl text-white leading-tight line-clamp-2">
                      {item.nombre}
                    </h3>
                    <span className="shrink-0 font-sans font-bold text-xs sm:text-base text-[#f6bb88]">
                      Bs. {item.precio}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
