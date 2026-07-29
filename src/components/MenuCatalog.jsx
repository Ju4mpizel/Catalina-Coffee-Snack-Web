import { motion, AnimatePresence } from "framer-motion";
import { Tag } from "lucide-react";

export default function MenuCatalog({
  items,
  selectedCategory,
  onSelectCategory,
  highlightedItemId,
}) {
  // Lista oficial de categorías
  const categories = [
    "Ofertas Catalina",
    "Todos",
    "Cafés",
    "Repostería",
    "Snacks",
    "Bebidas",
  ];

  // Filtrado de elementos dinámico y seguro
  const filteredItems =
    selectedCategory === "Todos"
      ? items
      : items.filter(
          (item) =>
            item.categoria &&
            item.categoria.toLowerCase().trim() ===
              selectedCategory.toLowerCase().trim(),
        );

  return (
    <section id="catalogo-section" className="py-20 max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7c5730] block mb-2">
          Catálogo Completo
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-8">
          Nuestro Menú
        </h2>

        {/* Pestañas de Categorías */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isOfferCategory = cat === "Ofertas Catalina";
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
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

      {/* Grid de Productos con Transición Acelerada */}
      <AnimatePresence mode="wait">
        <motion.div
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
              className={`p-5 rounded-2xl bg-white border transition-all duration-300 flex gap-4 relative ${
                item.esOferta
                  ? "border-[#81542b]/60 bg-[#fdf9f2]/40"
                  : "border-[#d5c3b7]/40"
              } ${
                highlightedItemId === item.id
                  ? "border-[#81542b] ring-2 ring-[#81542b]/30 shadow-lg scale-[1.01]"
                  : "shadow-xs hover:border-[#81542b]/40"
              }`}
            >
              {/* Imagen del Producto */}
              <div className="relative flex-shrink-0">
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                  loading="lazy"
                />
                {item.esOferta && (
                  <span className="absolute top-1 left-1 bg-[#81542b] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                    Oferta
                  </span>
                )}
              </div>

              {/* Información y Precios */}
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
                  <p className="text-xs sm:text-sm text-[#51443b] line-clamp-2">
                    {item.descripcion}
                  </p>
                </div>

                <span className="text-[10px] font-semibold text-[#7c5730] uppercase tracking-wider mt-2">
                  {item.categoria}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
