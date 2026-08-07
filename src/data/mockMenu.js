export const mockOfertas = [
  {
    id: "o1",
    titulo: "Combo Mañanero",
    descuento: "20% OFF",
    descripcion:
      "Cappuccino Artesanal + Croissant de Almendras para empezar el día con la mejor energía.",
    precioAntes: 40,
    precioOferta: 32,
    imagen:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format",
    valido: "Lunes a Viernes (08:30 - 11:00)",
  },
  {
    id: "o2",
    titulo: "Tarde de Moka & Queso",
    descuento: "Especial",
    descripcion:
      "Tostado Moka & Queso + Iced Caramel Latte a precio preferencial de tarde.",
    precioAntes: 49,
    precioOferta: 39,
    imagen:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=75&auto=format",
    valido: "Todos los días (15:00 - 18:00)",
  },
  {
    id: "o3",
    titulo: "Sweet Pair",
    descuento: "2x1 Repostería",
    descripcion:
      "En la compra de tu café de origen preferido, llévate el segundo Muffin de Arándanos a mitad de precio.",
    precioAntes: 44,
    precioOferta: 34,
    imagen:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=75&auto=format",
    valido: "Sábados y Domingos",
  },
];

export const mockMenu = [
  // Ítems de Ofertas Catalina
  {
    id: "mo1",
    nombre: "Combo Mañanero",
    categoria: "Ofertas Catalina",
    precio: 32,
    precioAntes: 40,
    descripcion:
      "Cappuccino Artesanal + Croissant de Almendras. (Ahorras Bs. 8)",
    imagen:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format",
    destacadoPinterest: "NO",
    esOferta: true,
  },
  {
    id: "mo2",
    nombre: "Tarde de Moka & Queso",
    categoria: "Ofertas Catalina",
    precio: 39,
    precioAntes: 49,
    descripcion: "Tostado Moka & Queso + Iced Caramel Latte. (Ahorras Bs. 10)",
    imagen:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=75&auto=format",
    destacadoPinterest: "NO",
    esOferta: true,
  },
  {
    id: "mo3",
    nombre: "Sweet Pair (2x1 Repostería)",
    categoria: "Ofertas Catalina",
    precio: 34,
    precioAntes: 44,
    descripcion: "Café de origen + Muffin de Arándanos a mitad de precio.",
    imagen:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=75&auto=format",
    destacadoPinterest: "NO",
    esOferta: true,
  },

  // Ítems del Menú General (6 de ellos con destacadoPinterest = "SÍ")
  {
    id: "1",
    nombre: "Cappuccino Artesanal",
    categoria: "Cafés",
    precio: 22,
    descripcion:
      "Espresso doble con leche texturizada al vapor y fino arte latte.",
    imagen:
      "https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "largo",
  },
  {
    id: "2",
    nombre: "Croissant de Almendras",
    categoria: "Repostería",
    precio: 18,
    descripcion:
      "Hojaldre artesanal horneado diariamente con crema pastelera de almendras.",
    imagen: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "cuadrado",
  },
  {
    id: "3",
    nombre: "Tostado Moka & Queso",
    categoria: "Snacks",
    precio: 25,
    descripcion:
      "Pan masa madre tostado a la plancha con mantequilla artesanal y queso fundido.",
    imagen:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "largo",
  },
  {
    id: "4",
    nombre: "Muffin de Arándanos",
    categoria: "Repostería",
    precio: 15,
    descripcion:
      "Esponjoso muffin con arándanos frescos orgánicos y crumble crujiente.",
    imagen:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ", // <-- AHORA TAMBIÉN APARECE EN PINTEREST
    formatoPinterest: "cuadrado",
  },
  {
    id: "5",
    nombre: "Espresso Doble Origen",
    categoria: "Cafés",
    precio: 14,
    descripcion:
      "Extracción limpia de granos seleccionados con notas a chocolate y miel.",
    imagen:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "cuadrado",
  },
  {
    id: "6",
    nombre: "Iced Caramel Latte",
    categoria: "Bebidas",
    precio: 24,
    descripcion:
      "Café frío con jarabe de caramelo artesanal, leche y hielo de espresso.",
    imagen:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "largo",
  },
  {
    id: "7",
    nombre: "Tarta Tatin de Manzana",
    categoria: "Repostería",
    precio: 20,
    descripcion:
      "Manzanas caramelizadas al horno sobre una fina base de hojaldre crujiente.",
    imagen:
      "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "cuadrado",
  },
  {
    id: "8",
    nombre: "Cold Brew de la Casa",
    categoria: "Bebidas",
    precio: 21,
    descripcion:
      "Maceración en frío durante 18 horas, refrescante, dulce y bajo en acidez.",
    imagen:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=75&auto=format",
    destacadoPinterest: "SÍ",
    formatoPinterest: "largo",
  },
];
