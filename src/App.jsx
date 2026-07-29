import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import OffersCarousel from "./components/OffersCarousel";
import AboutSection from "./components/AboutSection";
import LocationSection from "./components/LocationSection";
import MenuGallery from "./components/MenuGallery";
import MenuCatalog from "./components/MenuCatalog";
import Footer from "./components/Footer"; // <-- Importamos el Footer oficial
import { mockMenu, mockOfertas } from "./data/mockMenu";

export default function App() {
  const [currentView, setCurrentView] = useState("inicio");
  const [selectedCategory, setSelectedCategory] = useState("Ofertas Catalina");
  const [highlightedItemId, setHighlightedItemId] = useState(null);

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
            /* VISTA 1: INICIO COMPLETO */
            <>
              <Hero onExploreMenu={() => setCurrentView("menu")} />
              <OffersCarousel
                ofertas={mockOfertas}
                onGoToOffersMenu={handleGoToOffersMenu}
              />
              <AboutSection />
              <LocationSection />
            </>
          ) : (
            /* VISTA 2: MENÚ INTERACTIVO COMPLETO */
            <>
              <MenuGallery
                items={mockMenu}
                onItemClick={handleItemClickFromGallery}
              />
              <MenuCatalog
                items={mockMenu}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                highlightedItemId={highlightedItemId}
              />
            </>
          )}
        </main>
      </div>

      {/* FOOTER OFICIAL CON BRANDING Y NAVEGACIÓN */}
      <Footer
        onNavigateHome={() => setCurrentView("inicio")}
        onNavigateMenu={() => setCurrentView("menu")}
      />
    </div>
  );
}
