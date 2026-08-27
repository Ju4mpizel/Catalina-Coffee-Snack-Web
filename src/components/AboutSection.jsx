import { Cake, Coffee, Sofa } from "lucide-react";

const highlights = [
  {
    icon: Cake,
    title: "Horneado a Diario",
    description: "Postres y masitas frescas cada mañana.",
  },
  {
    icon: Coffee,
    title: "Café Seleccionado",
    description: "Tostado en su punto ideal para resaltar su mejor sabor.",
  },
  {
    icon: Sofa,
    title: "Ambiente Cálido",
    description: "El rincón perfecto para relajarte en Cochabamba.",
  },
];

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
                Nuestra esencia
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-8 leading-tight font-normal">
                Hecho con el Coraz&oacute;n
              </h2>

              <p className="font-sans text-[#51443b] leading-relaxed mb-8 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:font-bold first-letter:text-[#81542b] first-letter:text-6xl first-letter:leading-[0.75] first-letter:mt-1">
                En Catalina Coffee creemos que los mejores momentos suceden
                alrededor de una buena taza y algo dulce para acompa&ntilde;ar.
                Somos una cafeter&iacute;a donde cada detalle importa: desde el
                aroma del caf&eacute; reci&eacute;n preparado hasta la textura
                de cada postre que sale de nuestro horno.
              </p>

              <p className="font-sans text-[#51443b] leading-relaxed mb-8">
                Ponemos toda nuestra dedicaci&oacute;n en ofrecerte postres
                frescos, masitas crujientes y opciones saladas elaboradas a
                diario con ingredientes de calidad. Ya sea para charlar con
                amigos, trabajar tranquilos o darte un gusto a media tarde,
                nuestro espacio est&aacute; pensado para que te sientas como en
                casa.
              </p>

              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#7c5730] border-l-2 border-[#81542b]/40 pl-6 my-10">
                Servimos caf&eacute; como quien sirve una pausa: despacio y con
                intenci&oacute;n.
              </blockquote>
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

          <div
            data-reveal
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 sm:mt-14"
          >
            {highlights.map((item) => (
              <div
                key={item.title}
                className="bg-[#f1ede6] border border-[#d5c3b7]/40 rounded-2xl p-5 flex items-start gap-4"
              >
                <span className="w-11 h-11 rounded-xl bg-[#81542b]/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-[#81542b]" />
                </span>
                <div className="min-w-0">
                  <span className="block font-serif text-lg sm:text-xl font-bold text-[#81542b] leading-snug">
                    {item.title}
                  </span>
                  <span className="block text-sm text-[#51443b] font-medium leading-relaxed mt-1">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
