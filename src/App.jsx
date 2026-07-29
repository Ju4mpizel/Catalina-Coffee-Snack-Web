import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OffersCarousel from "./components/OffersCarousel";
import AboutSection from "./components/AboutSection";
import LocationSection from "./components/LocationSection";
import MenuGallery from "./components/MenuGallery";
import MenuCatalog from "./components/MenuCatalog";
import Footer from "./components/Footer";
import { fetchMenuData } from "./services/menuService";
import { Coffee } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState("inicio");
  const [selectedCategory, setSelectedCategory] = useState("Ofertas Catalina");
  const [highlightedItemId, setHighlightedItemId] = useState(null);

  // Estados para datos dinámicos desde Google Sheets
  const [menuItems, setMenuItems] = useState([]);
  const [ofertasItems, setOfertasItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleGoToOffersMenu = () => {
    setSelectedCategory("Ofertas Catalina");
    setCurrentView("menu");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
              <OffersCarousel
                ofertas={ofertasItems}
                onGoToOffersMenu={handleGoToOffersMenu}
              />
              <AboutSection />
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
    </div>
  );
}
