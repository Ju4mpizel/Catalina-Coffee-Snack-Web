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
import { Coffee } from "lucide-react";

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
    const revealEls = document.querySelectorAll("[data-reveal]");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fdf9f2] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#81542b] text-white flex items-center justify-center animate-bounce shadow-md">
          <Coffee className="w-6 h-6" />
        </div>
        <p className="font-serif text-lg text-[#1c1c18]">
          Cargando menú de Catalina...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdf9f2] text-[#1c1c18] font-sans flex flex-col justify-between">
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
    </div>
  );
}
