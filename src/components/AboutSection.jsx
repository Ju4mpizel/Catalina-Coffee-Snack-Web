

export default function AboutSection() {
  return (
    <section className="py-20 bg-[#f1ede6]/60 border-y border-[#d5c3b7]/30">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Lado Izquierdo: Mensaje */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7c5730] block mb-2">
            Nuestra Filosofía
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-6 leading-tight">
            Café de especialidad con alma artesanal
          </h2>
          <p className="font-sans text-[#51443b] leading-relaxed mb-6">
            En Catalina creemos que tomar un café no es solo una rutina, es una
            pausa en tu día. Seleccionamos granos locales e insumos de la más
            alta calidad para prepararte una experiencia memorable.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d5c3b7]/40">
            <div>
              <span className="font-serif text-2xl font-bold text-[#81542b] block">
                100%
              </span>
              <span className="text-xs text-[#51443b] font-medium">
                Grano Selección Bolivia
              </span>
            </div>
            <div>
              <span className="font-serif text-2xl font-bold text-[#81542b] block">
                Diario
              </span>
              <span className="text-xs text-[#51443b] font-medium">
                Horneado Artesanal
              </span>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Composición de Fotos */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
              alt="Café artesanal preparándose"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
