import { MapPin, Clock } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <div className="bg-[#f1ede6] rounded-3xl p-8 md:p-12 border border-[#d5c3b7]/50 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7c5730] block mb-2">
            Ven a Visitarnos
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1c1c18] mb-6">
            Te esperamos en nuestro rincón
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#81542b] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1c1c18] block text-sm">
                  Dirección
                </span>
                <span className="text-sm text-[#51443b]">
                  Cochabamba, Bolivia
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#81542b] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1c1c18] block text-sm">
                  Horarios de Atención
                </span>
                <span className="text-sm text-[#51443b]">
                  Lunes a Sábado: 08:30 – 20:30
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Iframe / Mapa Representativo */}
        <div className="w-full h-64 rounded-2xl overflow-hidden border border-[#d5c3b7]/60 shadow-xs">
          <iframe
            title="Ubicación Catalina"
            src="https://maps.google.com/maps?q=Cochabamba%20Bolivia&t=&z=14&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </section>
  );
}
