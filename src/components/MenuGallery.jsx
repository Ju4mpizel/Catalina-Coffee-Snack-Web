import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Heart } from "lucide-react";

export default function MenuGallery({ items, onItemClick }) {
  // Filtramos solo los elementos destacados para Pinterest
  const featuredItems = items.filter(
    (item) => item.destacadoPinterest === "SÍ",
  );

  // Dividimos los ítems en 3 columnas intercaladas para lograr el flujo de Pinterest real
  const col1 = featuredItems.filter((_, i) => i % 3 === 0);
  const col2 = featuredItems.filter((_, i) => i % 3 === 1);
  const col3 = featuredItems.filter((_, i) => i % 3 === 2);

  const renderPinCard = (item) => {
    // Definimos alturas visuales variadas para simular pines reales
    const heightClass =
      item.formatoPinterest === "largo"
        ? "h-96"
        : item.formatoPinterest === "cuadrado"
          ? "h-64"
          : "h-80";

    return (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -6 }}
        onClick={() => onItemClick(item)}
        className="relative group cursor-pointer overflow-hidden rounded-3xl bg-[#f1ede6] border border-[#d5c3b7]/40 shadow-xs hover:shadow-2xl transition-all duration-300"
      >
        {/* Contenedor de Imagen de Altura Asimétrica */}
        <div className={`w-full ${heightClass} relative overflow-hidden`}>
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Overlay Oscuro con Gradiente Suave al Posarse */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c18]/85 via-[#1c1c18]/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />

          {/* Badge de Categoría Arriba a la Izquierda */}
          <div className="absolute top-3 left-3 bg-[#fdf9f2]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#d5c3b7]/50 shadow-xs">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#81542b]">
              {item.categoria}
            </span>
          </div>

          {/* Botón Flotante tipo Pin Arriba a la Derecha */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1c1c18] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#81542b] hover:text-white shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </div>

          {/* Info Inferior Estilo Galería */}
          <div className="absolute bottom-0 inset-x-0 p-5 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="font-serif text-xl font-bold text-white leading-tight mb-1 drop-shadow-xs">
              {item.nombre}
            </h3>

            <div className="flex items-center justify-between mt-2">
              <span className="font-sans font-bold text-sm text-[#f6bb88]">
                Bs. {item.precio}
              </span>
              <span className="text-[11px] font-medium text-white/80 flex items-center gap-1 group-hover:text-white">
                <Heart className="w-3.5 h-3.5 text-[#f6bb88] fill-[#f6bb88]" />
                <span>Ver en Menú</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Título de la Sección */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1ede6] text-[#81542b] text-xs font-semibold tracking-wide uppercase mb-3 border border-[#d5c3b7]/50">
          <Sparkles className="w-3.5 h-3.5 text-[#81542b]" />
          <span>Inspiración Visual</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-3">
          Tablero de Sabores
        </h2>
        <p className="font-sans text-sm text-[#51443b] max-w-md mx-auto">
          Explora nuestras creaciones visualmente. Haz clic en cualquiera para
          ir directamente a su posición en el menú.
        </p>
      </div>

      {/* Grid de 3 Columnas Estilo Pinterest Real (Masonry Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        <div className="flex flex-col gap-6">{col1.map(renderPinCard)}</div>
        <div className="flex flex-col gap-6">{col2.map(renderPinCard)}</div>
        <div className="flex flex-col gap-6 sm:hidden lg:flex">
          {col3.map(renderPinCard)}
        </div>
      </div>
    </section>
  );
}
