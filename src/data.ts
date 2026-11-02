export interface Product {
  id: number;
  name: Record<Lang, string>;
  desc: Record<Lang, string>;
  price: number;
  img: string;
  tag?: string;
}

export type Lang = "es" | "en";

export const products: Product[] = [
  {
    id: 1,
    name: {
      es: "Alfajor Negro Clásico",
      en: "Classic Dark Alfajor",
    },
    desc: {
      es: "Bañado en puro chocolate 70% cacao y generoso dulce de leche.",
      en: "Dipped in pure 70% cacao chocolate with generous dulce de leche.",
    },
    price: 1500,
    img: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    tag: "Bestseller",
  },
  {
    id: 2,
    name: {
      es: "Alfajor de Maizena",
      en: "Cornstarch Alfajor",
    },
    desc: {
      es: "Masa súper suave que se deshace en la boca, coco rallado y dulce de leche intenso.",
      en: "Ultra-soft dough melting in your mouth, shredded coconut and rich caramel.",
    },
    price: 1300,
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
    tag: "Colección",
  },
  {
    id: 3,
    name: {
      es: "Pistacho y Choco Blanco",
      en: "Pistachio & White Choco",
    },
    desc: {
      es: "Relleno con pasta de pistacho artesanal y cobertura de chocolate blanco fino.",
      en: "Filled with craft pistachio paste and premium white chocolate coating.",
    },
    price: 1900,
    img: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80",
    tag: "Exclusivo",
  },
  {
    id: 4,
    name: {
      es: "Alfajor de Fruta",
      en: "Fruit Jam Alfajor",
    },
    desc: {
      es: "Relleno de dulce de membrillo casero con un glaseado crocante tradicional.",
      en: "Filled with homemade quince jam and topped with crispy sugar glaze.",
    },
    price: 1300,
    img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
  },
];

export const dictionary: Record<Lang, Record<string, string>> = {
  es: {
    logo: "El Galpón",
    logoTooltip: "Alfajores artesanales",
    navInicio: "Inicio",
    navProductos: "Productos",
    navNosotros: "Sobre Nosotros",
    navContacto: "Contacto",
    navCarrito: "Carrito",
    heroBadge: "100% artesanal · Córdoba, Argentina",
    heroTitle1: "Alfajores de",
    heroTitle2: "altísima calidad",
    heroSub: "El sabor de la tradición argentina, con los ingredientes más puros y un dulce de leche generoso en cada bocado.",
    heroCta: "Ver menú",
    heroSecondary: "Sobre nosotros",
    sectionProductosLabel: "Nuestras especialidades",
    sectionProductosTitle: "Alfajores que enamoran",
    sectionProductosSub:
      "Cada alfajor es elaborado a mano con masa casera, rellenos generosos y coberturas de alta calidad.",
    sectionNosotrosLabel: "Sobre nosotros",
    sectionNosotrosTitle: "Tradición y cariño en cada capa",
    sectionNosotrosSub:
      "Somos un pequeño taller familiar de Córdoba dedicado a recuperar y modernizar la receta de nuestros abuelos.",
    statCadaDia: "Alfajores / día",
    statAnos: "Años de tradición",
    statPuntaje: "Puntaje avg.",
    statClientes: "Clientes felices",
    labelNombre: "Nombre",
    labelEmail: "Correo electrónico",
    labelMensaje: "Mensaje",
    placeholderNombre: "Tu nombre",
    placeholderEmail: "tu@email.com",
    placeholderMensaje: "¿En qué podemos ayudarte?",
    btnEnviar: "Enviar mensaje",
    footerMarca: "El Galpón",
    footerDesc:
      "Elaboración 100% artesanal manteniendo la tradición y la calidad en cada bocado.",
    footerHorarios: "Horarios de atención",
    footerHorarioText:
      "Lunes a Sábado: 09:00 - 20:00 · Domingos: 10:00 - 14:00",
    footerContacto: "Contacto y ubicación",
    footerUbi: "Av. San Martín 1420, Córdoba",
    footerTel: "+54 9 351 123 4567",
    footerCopy: "© 2026 El Galpón — Todos los derechos reservados.",
    toastAgregado: "¡Agregado al carrito!",
    toastCarrito: "Visita tu carrito",
    cargando: "Cargando base de datos...",
    errorDb: "Error al cargar la base de datos. Reintentá.",
    retry: "Reintentar",
    langEs: "ES",
    langEn: "EN",
  },
  en: {
    logo: "The Barn",
    logoTooltip: "Artisanal alfajores",
    navInicio: "Home",
    navProductos: "Products",
    navNosotros: "About",
    navContacto: "Contact",
    navCarrito: "Cart",
    heroBadge: "100% handcrafted · Córdoba, Argentina",
    heroTitle1: "Alfajores of",
    heroTitle2: "top-tier quality",
    heroSub: "The real taste of Argentine tradition, with pure ingredients and generous dulce de leche in every bite.",
    heroCta: "View menu",
    heroSecondary: "About us",
    sectionProductosLabel: "Our specialties",
    sectionProductosTitle: "Alfajores that win hearts",
    sectionProductosSub:
      "Each alfajor is handmade with homemade dough, generous fillings and premium coatings.",
    sectionNosotrosLabel: "About us",
    sectionNosotrosTitle: "Tradition and care in every layer",
    sectionNosotrosSub:
      "We are a small family workshop in Córdoba dedicated to preserving and modernizing our grandparents' recipe.",
    statCadaDia: "Alfajores / day",
    statAnos: "Years of tradition",
    statPuntaje: "Avg. rating",
    statClientes: "Happy customers",
    labelNombre: "Name",
    labelEmail: "Email",
    labelMensaje: "Message",
    placeholderNombre: "Your name",
    placeholderEmail: "you@email.com",
    placeholderMensaje: "How can we help?",
    btnEnviar: "Send message",
    footerMarca: "The Barn",
    footerDesc:
      "100% handcrafted, keeping tradition and quality in every bite.",
    footerHorarios: "Opening hours",
    footerHorarioText:
      "Mon–Sat: 09:00–20:00 · Sun: 10:00–14:00",
    footerContacto: "Contact & location",
    footerUbi: "Av. San Martín 1420, Córdoba",
    footerTel: "+54 9 351 123 4567",
    footerCopy: "© 2026 The Barn — All rights reserved.",
    toastAgregado: "Added to cart!",
    toastCarrito: "Check your cart",
    cargando: "Loading database...",
    errorDb: "Error loading the database. Please retry.",
    retry: "Retry",
    langEs: "ES",
    langEn: "EN",
  },
};

export const cartLabel: Record<Lang, string> = {
  es: "Carrito",
  en: "Cart",
};

export const stats = {
  es: {
    cadaDia: "350+",
    anios: "6",
    puntaje: "4.9",
    clientes: "2.400+",
  },
  en: {
    cadaDia: "350+",
    anios: "6",
    puntaje: "4.9",
    clientes: "2.400+",
  },
};
