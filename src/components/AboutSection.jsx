export default function AboutSection() {
  return (
    <>
      <div className="divider-warm my-12" />
      <section
        id="about"
        className="relative py-12 sm:py-20 overflow-hidden scroll-mt-24"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div data-reveal>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#81542b] block mb-4">
                Nuestra historia
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-8 leading-tight font-normal">
                Caf&eacute; de especialidad con alma artesanal
              </h2>

              <p className="font-sans text-[#51443b] leading-relaxed mb-8 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:font-bold first-letter:text-[#81542b] first-letter:text-6xl first-letter:leading-[0.75] first-letter:mt-1">
                En Catalina creemos que tomar un caf&eacute; no es solo una
                rutina: es una pausa en tu d&iacute;a. Seleccionamos granos
                locales e insumos de la m&aacute;s alta calidad para prepararte
                una experiencia memorable.
              </p>

              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#7c5730] border-l-2 border-[#81542b]/40 pl-6 my-10">
                Servimos caf&eacute; como quien sirve una pausa: despacio y con
                intenci&oacute;n.
              </blockquote>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#d5c3b7]/40">
                <div>
                  <span className="font-serif text-2xl font-bold text-[#81542b] block">
                    100%
                  </span>
                  <span className="text-xs text-[#51443b] font-medium">
                    Grano de selecci&oacute;n Bolivia
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold text-[#81542b] block">
                    Diario
                  </span>
                  <span className="text-xs text-[#51443b] font-medium">
                    Horneado artesanal
                  </span>
                </div>
              </div>
            </div>

            <figure
              className="relative w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none"
              data-reveal
              style={{ transitionDelay: "120ms" }}
            >
              <div className="photo-warm rounded-3xl overflow-hidden shadow-md border-4 border-white aspect-[3/2] lg:aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=900&q=80"
                  alt="Caf&eacute; artesanal prepar&aacute;ndose en Catalina"
                  className="w-full h-full object-cover"
                  width="900"
                  height="1125"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="text-xs italic text-[#51443b]/70 mt-3 text-center">
                La barra de Catalina, cada ma&ntilde;ana.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
}
