import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MarqueeBanner from "./components/MarqueeBanner";
import OffersCarousel from "./components/OffersCarousel";
import AboutSection from "./components/AboutSection";
import ProcessTimeline from "./components/ProcessTimeline";
import Testimonials from "./components/Testimonials";
import InstagramSection from "./components/TiktokSection";
import LocationSection from "./components/LocationSection";
import MenuGallery from "./components/MenuGallery";
import MenuCatalog from "./components/MenuCatalog";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsappButton";
import { fetchMenuData } from "./services/menuService";
import { AnimatePresence, m } from "framer-motion";

export default function App() {
  const [currentView, setCurrentView] = useState("inicio");
  const [selectedCategory, setSelectedCategory] = useState("Ofertas Catalina");
  const [highlightedItemId, setHighlightedItemId] = useState(null);

  const [menuItems, setMenuItems] = useState([]);
  const [ofertasItems, setOfertasItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carga inicial de datos
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      const { menu, ofertas } = await fetchMenuData();
      setMenuItems(menu);
      setOfertasItems(ofertas);
      setIsLoading(false);
    }
    loadData();
  }, []);

  // Revalidación silenciosa en segundo plano al volver a la pestaña (Visibility Change)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        const { menu, ofertas } = await fetchMenuData();
        setMenuItems(menu);
        setOfertasItems(ofertas);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Aparición progresiva de secciones: añade `.is-visible` al entrar en viewport.
  useEffect(() => {
    const revealEls = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    if (typeof IntersectionObserver === "undefined") {
      revealEls.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [currentView, isLoading]);

  const handleItemClickFromGallery = (item) => {
    setSelectedCategory(item.categoria);
    setHighlightedItemId(item.id);

    const catalogElement = document.getElementById("catalogo-section");
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      setHighlightedItemId(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen w-full bg-[#fdf9f2] text-[#1c1c18] font-sans flex flex-col justify-between relative">
      <div>
        <Navbar
          onNavigateHome={() => setCurrentView("inicio")}
          onNavigateMenu={() => setCurrentView("menu")}
          currentView={currentView}
        />

        <main>
          {currentView === "inicio" ? (
            <>
              <Hero onExploreMenu={() => setCurrentView("menu")} />
              <MarqueeBanner />
              <OffersCarousel ofertas={ofertasItems} />
              <AboutSection />
              <ProcessTimeline />
              <div className="divider-warm max-w-6xl mx-auto px-6 my-2" />
              <Testimonials />
              <div className="divider-warm max-w-6xl mx-auto px-6 my-2" />
              <InstagramSection />
              <div className="divider-warm max-w-6xl mx-auto px-6 my-2" />
              <LocationSection />
            </>
          ) : (
            <>
              <MenuGallery
                items={menuItems}
                onItemClick={handleItemClickFromGallery}
              />
              <MenuCatalog
                items={menuItems}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                highlightedItemId={highlightedItemId}
              />
            </>
          )}
        </main>
      </div>

      <Footer
        onNavigateHome={() => setCurrentView("inicio")}
        onNavigateMenu={() => setCurrentView("menu")}
      />

      {/* Botón flotante de WhatsApp siempre visible */}
      <WhatsAppButton />

      {/* Loader de bienvenida: overlay fijo que se desvanece al terminar la carga.
          La app se monta debajo para que el IntersectionObserver de [data-reveal]
          funcione desde el inicio (con mode="wait" las secciones nunca se mostraban). */}
      <AnimatePresence>
        {isLoading && (
          <m.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-[#fdf9f2] flex flex-col items-center justify-center gap-7 px-6"
          >
            {/* Logo con pulso suave */}
            <img
              src="/logo.svg"
              alt="Catalina Coffee & Snack"
              className="h-16 w-auto object-contain animate-pulse"
              decoding="async"
            />

            {/* Anillo spinner fino */}
            <div className="relative w-10 h-10" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border-2 border-[#81542b]/15" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#81542b] animate-spin" />
            </div>

            <div className="text-center space-y-2.5">
              <p className="font-serif text-xl text-[#1c1c18]">
                Preparando la experiencia...
              </p>
              <p className="text-xs text-[#81542b]/70 tracking-widest uppercase font-medium">
                Catalina Coffee &amp; Snack
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
