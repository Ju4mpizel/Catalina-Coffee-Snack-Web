import { m } from "framer-motion";
import { Camera, Heart, MessageCircle } from "lucide-react";

const photos = [
  {
    url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    likes: 142,
    comments: 8,
  },
  {
    url: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&h=400&fit=crop",
    likes: 98,
    comments: 5,
  },
  {
    url: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=400&fit=crop",
    likes: 215,
    comments: 12,
  },
  {
    url: "https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400&h=400&fit=crop",
    likes: 76,
    comments: 3,
  },
  {
    url: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    likes: 183,
    comments: 9,
  },
  {
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=400&fit=crop",
    likes: 64,
    comments: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    likes: 157,
    comments: 11,
  },
  {
    url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400&h=400&fit=crop",
    likes: 91,
    comments: 6,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function InstagramSection() {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#4a2e16] block mb-2">
          Instagram
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#1c1c18] mb-3 font-normal">
          S&iacute;guenos @catalinacoffee
        </h2>
        <p className="font-sans text-sm text-[#51443b] max-w-md mx-auto">
          Comparte tu momento con nosotros y etiqu&eacute;tanos para aparecer
          en nuestra galer&iacute;a.
        </p>
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {photos.map((photo) => (
          <m.div
            key={photo.url}
            variants={itemVariants}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-[#f1ede6] photo-warm"
          >
            <img
              src={photo.url}
              alt="Caf\u00e9 Catalina"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c18]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="flex items-center gap-3 text-white text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-white/80 text-white/80" />
                  {photo.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-white/80 text-white/80" />
                  {photo.comments}
                </span>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>

      <div className="text-center mt-10">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#81542b] hover:bg-[#6b4321] text-white text-sm font-semibold transition-colors duration-200 shadow-xs hover:shadow-md active:scale-95"
        >
          <Camera className="w-4 h-4" />
          <span>Seguir en Instagram</span>
        </a>
      </div>
    </section>
  );
}
