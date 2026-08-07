import { useState } from "react";

export default function BrandLogo({
  logoUrl = "/logo.svg",
  size = "md",
  onClick,
  fetchPriority = "auto",
  decoding = "async",
  ariaLabel = "Catalina Coffee & Snack",
}) {
  const [imgError, setImgError] = useState(false);

  // Dimensiones ampliadas para que el logo destaque sin texto al lado
  const dimensions =
    {
      sm: "h-10", // Móvil o espacios reducidos
      md: "h-12 sm:h-14", // Navbar / Footer (compacto en pantallas intermedias)
      lg: "h-20 sm:h-24", // Para el Footer o vistas destacadas
      footer: "h-10 md:h-14", // Footer: compacto en móvil, estándar en desktop
    }[size] || "h-14 sm:h-16";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="flex items-center cursor-pointer group select-none py-1 bg-transparent border-none p-0"
    >
      {!imgError ? (
        <img
          src={logoUrl}
          alt="Catalina Coffee & Snack"
          fetchPriority={fetchPriority}
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
