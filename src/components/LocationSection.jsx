import { MapPin, Clock, Navigation, MessageCircle } from "lucide-react";
import { getWhatsappUrl } from "../config/site";

const whatsappUrl = getWhatsappUrl(
  "Hola Catalina Coffee, quisiera una consulta",
);
const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Cochabamba%2C+Bolivia";

export default function LocationSection() {
  return (
    <>
      <div className="divider-warm my-12" />
      <section id="location" data-reveal className="py-12 sm:py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#81542b] block mb-4">
            D&oacute;nde encontrarnos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-10 leading-tight font-normal">
            Te esperamos en nuestro rinc&oacute;n
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-6 items-stretch">
            <div className="flex flex-col gap-6">
              <div className="bg-[#f1ede6] border border-[#d5c3b7]/30 rounded-3xl p-6 sm:p-8 flex-1">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#81542b]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#81542b]" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg text-[#1c1c18] mb-1">
                      Direcci&oacute;n
                    </h3>
                    <p className="text-sm text-[#51443b] mb-4">
                      Cochabamba, Bolivia
                    </p>
                    <a
                      href={directionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#81542b] hover:text-[#7c5730] transition-colors"
                    >
                      <Navigation className="w-4 h-4" />
                      C&oacute;mo llegar
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#f1ede6] border border-[#d5c3b7]/30 rounded-3xl p-6 sm:p-8 flex-1">
                <div className="flex items-start gap-4">
                  <span className="w-10 h-10 rounded-xl bg-[#81542b]/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#81542b]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-lg text-[#1c1c18] mb-4">
                      Horarios de atenci&oacute;n
                    </h3>
                    <dl className="space-y-2 mb-5">
                      <div className="flex items-baseline gap-2 text-sm">
                        <dt className="text-[#1c1c18] font-medium">
                          Lunes a S&aacute;bado
                        </dt>
                        <dd className="flex-1 border-b border-dotted border-[#81542b]/40 mb-1" />
                        <dd className="text-[#51443b] tabular-nums">
                          08:30 &ndash; 20:30
                        </dd>
                      </div>
                    </dl>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#81542b] hover:text-[#7c5730] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contactar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f1ede6] border border-[#d5c3b7]/30 rounded-3xl p-2 sm:p-3">
              <div className="aspect-video rounded-2xl overflow-hidden border border-[#d5c3b7]/40">
                <iframe
                  title="Mapa de ubicaci&oacute;n de Catalina"
                  src="https://maps.google.com/maps?q=Cochabamba%20Bolivia&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
