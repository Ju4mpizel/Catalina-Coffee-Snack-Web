import { useState, useEffect, useRef } from "react";
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
import { fetchMenuData, getInitialMenuData } from "./services/menuService";

export default function App() {
  const [currentView, setCurrentView] = useState("inicio");
  const [selectedCategory, setSelectedCategory] = useState("Cafés");
  const [highlightedItemId, setHighlightedItemId] = useState(null);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    return undefined;
  }, [currentView]);

  const initialData = getInitialMenuData();
  const [menuItems, setMenuItems] = useState(initialData.menu);
  const [ofertasItems, setOfertasItems] = useState(initialData.ofertas);

  useEffect(() => {
    async function loadData() {
      const { menu, ofertas } = await fetchMenuData();
      if (menu && menu.length > 0) setMenuItems(menu);
      if (Array.isArray(ofertas)) setOfertasItems(ofertas);
    }
    loadData();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible") {
        const { menu, ofertas } = await fetchMenuData();
        if (menu && menu.length > 0) setMenuItems(menu);
        if (Array.isArray(ofertas)) setOfertasItems(ofertas);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    const revealEls = document.querySelectorAll(
      "[data-reveal]:not(.is-visible)",
    );
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
  }, [currentView]);

  const handleItemClickFromGallery = (item) => {
    setSelectedCategory(item.categoria);
    setHighlightedItemId(item.id);
  };

  useEffect(() => {
    if (!highlightedItemId) return undefined;

    let cancelled = false;

    const scrollTimer = setTimeout(() => {
      if (cancelled) return;
      const catalogElement = document.getElementById("catalogo-section");
      if (catalogElement) {
        catalogElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 420);

    const clearTimer = setTimeout(() => {
      setHighlightedItemId(null);
    }, 2800);

    return () => {
      cancelled = true;
      clearTimeout(scrollTimer);
      clearTimeout(clearTimer);
    };
  }, [highlightedItemId]);

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
              {ofertasItems && ofertasItems.length > 0 && (
                <OffersCarousel ofertas={ofertasItems} />
              )}
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

      <WhatsAppButton />
    </div>
  );
}
