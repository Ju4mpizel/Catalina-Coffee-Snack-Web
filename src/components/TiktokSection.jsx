import { Play, Heart, Video } from "lucide-react";

const TIKTOK_VIDEOS = [
  {
    id: "7532555626266774840",
    url: "https://www.tiktok.com/@catalina.coffee0/video/7532555626266774840",
    title: "Ven a probar los mejores postres 🍰✨",
    views: "1.4K",
    likes: "220",
    thumbnail:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=1000&fit=crop", // Postre de chocolate artesanal
  },
  {
    id: "7621375144660864274",
    url: "https://www.tiktok.com/@catalina.coffee0/video/7621375144660864274",
    title: "Noche de estudio ¿Qué puedo tomar? ☕📚",
    views: "2.1K",
    likes: "270",
    thumbnail:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&h=1000&fit=crop", // Café Latte & Libros de estudio
  },
  {
    id: "7532168088251387141",
    url: "https://www.tiktok.com/@catalina.coffee0/video/7532168088251387141",
    title: "Cómo llegar & Experiencia en nuestra terraza 🌿",
    views: "5.8K",
    likes: "750",
    thumbnail:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=1000&fit=crop", // Terraza y fachada acogedora
  },
  {
    id: "7608584465958358280",
    url: "https://www.tiktok.com/@catalina.coffee0/video/7608584465958358280",
    title: "Prueba nuestro delicioso Sándwich de Pollo Ahumado 🥪",
    views: "3.2K",
    likes: "250",
    thumbnail:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=1000&fit=crop", // Sándwich tostado gourmet
  },
];

export default function TikTokSection() {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6">
      <div data-reveal className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f1ede6] text-[#81542b] text-xs font-semibold tracking-wide uppercase mb-3 border border-[#d5c3b7]/50">
          <Video className="w-3.5 h-3.5 text-[#81542b]" />
          <span>Comunidad TikTok</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-3 font-normal">
          Detrás de Cámara en TikTok
        </h2>
        <p className="font-sans text-sm text-[#51443b] max-w-md mx-auto">
          Mira nuestras preparaciones, el ambiente y cómo llegar directamente en
          @catalina.coffee0.
        </p>
      </div>

      {/* Grid de tarjetas limpias en ratio 9:16 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {TIKTOK_VIDEOS.map((video, index) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            style={{ transitionDelay: `${index * 80}ms` }}
            className="group relative aspect-[9/16] rounded-3xl overflow-hidden cursor-pointer bg-[#f1ede6] border border-[#d5c3b7]/40 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-[0.98]"
          >
            {/* Imagen de Portada Temática */}
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out photo-warm"
              loading="lazy"
              decoding="async"
            />

            {/* Capa de Información Estilo TikTok */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-between p-4">
              {/* Botón de Play Superior */}
              <div className="self-end w-9 h-9 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-[#81542b] transition-all">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>

              {/* Textos inferiores limpios */}
              <div>
                <p className="text-white font-serif text-xs sm:text-sm font-medium line-clamp-2 mb-2 leading-snug drop-shadow-xs">
                  {video.title}
                </p>
                <div className="flex items-center gap-3 text-white/90 text-[11px] font-sans font-semibold">
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3 fill-white/80 text-white/80" />
                    {video.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-white/80 text-white/80" />
                    {video.likes}
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="https://www.tiktok.com/@catalina.coffee0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1c1c18] hover:bg-[#362419] text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg active:scale-95 border border-[#81542b]/30"
        >
          <Video className="w-4 h-4 text-[#e8b87d]" />
          <span>Seguir en TikTok @catalina.coffee0</span>
        </a>
      </div>
    </section>
  );
}
