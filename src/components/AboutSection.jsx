export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 bg-ambient-warm border-t border-[#d5c3b7]/20 overflow-hidden scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#4a2e16] block mb-2">
            Nuestra Filosof&iacute;a
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-6 leading-tight font-normal">
            Caf&eacute; de especialidad con alma artesanal
          </h2>
          <p className="font-sans text-[#51443b] leading-relaxed mb-6">
            En Catalina creemos que tomar un caf&eacute; no es solo una rutina,
            es una pausa en tu d&iacute;a. Seleccionamos granos locales e
            insumos de la m&aacute;s alta calidad para prepararte una
            experiencia memorable.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#d5c3b7]/40">
            <div>
              <span className="font-serif text-2xl font-bold text-[#81542b] block">
                100%
              </span>
              <span className="text-xs text-[#51443b] font-medium">
                Grano Selecci&oacute;n Bolivia
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

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-md border-4 border-white photo-warm">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
              alt="Caf\u00e9 artesanal prepar\u00e1ndose"
              className="w-full h-80 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
