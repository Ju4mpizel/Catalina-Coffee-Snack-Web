import { useState } from "react";

export default function BrandLogo({
  logoUrl = "/Catalina_Logo_nuevo.svg",
  size = "md",
  onClick,
  fetchPriority = "auto",
  loading = "eager",
  decoding = "async",
  ariaLabel = "Catalina Coffee & Snack",
}) {
  const [imgError, setImgError] = useState(false);

  // Dimensiones equilibradas en navbar y footer
  const dimensions =
    {
      sm: "h-12 sm:h-14", // Móvil o espacios reducidos
      md: "h-14 sm:h-16", // Navbar: visible pero sin robar protagonismo
      lg: "h-16 sm:h-20", // Para el Footer o vistas destacadas
      footer: "h-14 md:h-20", // Footer: compacto en móvil, mediano en desktop
    }[size] || "h-14 sm:h-16";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center cursor-pointer group select-none bg-transparent border-none p-0"
    >
      {!imgError ? (
        <img
          src={logoUrl}
          alt="Catalina Coffee & Snack"
          fetchPriority={fetchPriority}
          loading={loading}
          decoding={decoding}
          onError={() => setImgError(true)}
          className={`${dimensions} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      ) : (
        /* Texto de respaldo únicamente si la imagen falla al cargar */
        <span className="font-serif text-2xl font-bold text-[#1c1c18]">
          Catalina
        </span>
      )}
    </button>
  );
}
