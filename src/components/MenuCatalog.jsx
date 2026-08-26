import { useLayoutEffect, useRef, useState, useEffect, useId } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format";

// Descripción con soporte "Ver más / Ver menos" y apertura suave en móvil.
// Mide la altura natural (scrollHeight) y la altura recortada (clientHeight)
// de la misma etiqueta <p> para animar `height` entre ambos estados con framer-motion.
function ExpandableDescription({ text }) {
  const ref = useRef(null);
  const expandedRef = useRef(false);
  const [expanded, setExpanded] = useState(false);
  const [truncated, setTruncated] = useState(false);
  const [closedHeight, setClosedHeight] = useState(null);
  const [openHeight, setOpenHeight] = useState(null);
  const contentId = useId();

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const open = el.scrollHeight;
      setOpenHeight(open);
      // Solo capturamos la altura recortada mientras el texto está contraído.
      if (!expandedRef.current) {
        setClosedHeight(el.clientHeight);
        setTruncated(open > el.clientHeight + 1);
      }
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  const targetHeight = expanded ? openHeight : closedHeight;

  return (
    <div>
      <m.div
        id={contentId}
        initial={false}
        animate={{ height: targetHeight || "auto" }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <p
          ref={ref}
          className={`text-xs sm:text-sm text-[#51443b] ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {text}
        </p>
      </m.div>
      {truncated && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={contentId}
          className="mt-1.5 inline-flex items-center gap-0.5 text-xs font-semibold text-[#81542b] hover:text-[#5a3a1e] hover:underline underline-offset-2 cursor-pointer active:scale-95 transition-transform"
        >
          {expanded ? "Ver menos" : "Ver más"}
        </button>
      )}
    </div>
  );
}

export default function MenuCatalog({
  items,
  selectedCategory,
  onSelectCategory,
  highlightedItemId,
}) {
  // 1. Categorías 100% dinámicas extraídas del Google Sheet con guard defensivo
  const safeItems = items || [];

  const dynamicCategories = Array.from(
    new Set(safeItems.map((i) => i.categoria?.trim()).filter(Boolean)),
  );

  // Filtrado case-insensitive para evitar botones duplicados por variaciones de mayúsculas/minúsculas
  const categories = [
    "Ofertas Catalina",
    "Todos",
    ...dynamicCategories.filter(
      (cat) =>
        cat.toLowerCase() !== "ofertas catalina" &&
        cat.toLowerCase() !== "todos",
    ),
  ];

  // Filtrado dinámico de items
  const filteredItems =
    selectedCategory === "Todos"
      ? safeItems
      : safeItems.filter(
          (item) =>
            item.categoria &&
            item.categoria.toLowerCase().trim() ===
              selectedCategory.toLowerCase().trim(),
        );

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = FALLBACK_IMAGE;
  };

  return (
    <section
      id="catalogo-section"
      data-reveal
      className="py-20 max-w-6xl mx-auto px-6"
    >
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7c5730] block mb-2">
          Catálogo Completo
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-8">
          Nuestro Menú
        </h2>

        {/* Pestañas de Categorías Dinámicas */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isOfferCategory = cat === "Ofertas Catalina";
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center gap-2 ${
                  isOfferCategory
                    ? isSelected
                      ? "bg-[#81542b] text-white shadow-md ring-2 ring-[#81542b]/40"
                      : "bg-[#81542b]/15 text-[#81542b] border border-[#81542b]/40 hover:bg-[#81542b]/25"
                    : isSelected
                    ? "bg-[#81542b] text-white shadow-sm"
                    : "bg-[#f1ede6] text-[#51443b] hover:bg-[#ece8e1]"
                }`}
              >
                {isOfferCategory && <Tag className="w-4 h-4 text-current" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Productos */}
      <AnimatePresence mode="wait">
        <m.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              id={`item-${item.id}`}
              className={`p-5 rounded-2xl bg-white border transition-all duration-200 hover:-translate-y-0.5 flex gap-4 relative ${
                item.esOferta
                  ? "border-[#81542b]/60 bg-[#fdf9f2]/40"
                  : "border-[#d5c3b7]/40"
              } ${
                highlightedItemId === item.id
                  ? "border-[#81542b] ring-2 ring-[#81542b]/30 shadow-lg scale-[1.01]"
                  : "shadow-xs hover:border-[#81542b]/40 active:scale-[0.99]"
              }`}
            >
              {/* Imagen con Fallback */}
              <div className="relative flex-shrink-0">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  onError={handleImageError}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover bg-[#f1ede6]"
                  loading="lazy"
                  decoding="async"
                />
                {item.esOferta && (
                  <span className="absolute top-1 left-1 bg-[#81542b] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Oferta
                  </span>
                )}
              </div>

              {/* Información de Producto */}
              <div className="flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-serif text-lg font-bold text-[#1c1c18]">
                      {item.nombre}
                    </h3>
                    <div className="text-right">
                      {item.precioAntes && (
                        <span className="text-xs text-[#51443b] line-through block leading-none mb-0.5">
                          Bs. {item.precioAntes}
                        </span>
                      )}
                      <span className="font-sans font-bold text-[#81542b] text-base whitespace-nowrap">
                        Bs. {item.precio}
                      </span>
                    </div>
                  </div>
                  <ExpandableDescription text={item.descripcion} />
                </div>

                <span className="text-[10px] font-semibold text-[#7c5730] uppercase tracking-wider mt-2">
                  {item.categoria}
                </span>
              </div>
            </div>
          ))}
        </m.div>
      </AnimatePresence>
    </section>
  );
}
