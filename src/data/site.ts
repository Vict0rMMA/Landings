export const contact = {
  brand: "Where?",
  tagline: "Qué hay pa’ hacer hoy",
  phoneLabel: "+57 317 090 5022",
  phoneRaw: "573170905022",
  email: "contacto@where.com.co",
  web: "https://www.where.com.co",
  webLabel: "where.com.co",
  facebook: "https://www.facebook.com/Where.medellin",
  facebookLabel: "Where.medellin",
  hours: "Atención 24 horas",
} as const;

const defaultMessage =
  "Hola Where, quiero información del plan a Playa Soledad, Chocó. ¿Qué fechas y precios tienen?";

export const whatsappLink = (message: string = defaultMessage) =>
  `https://wa.me/${contact.phoneRaw}?text=${encodeURIComponent(message)}`;

export const destination = {
  name: "Playa Soledad",
  region: "Chocó, Colombia",
  quote: "Aquí sucede la vida.",
};

export type NavItem = { id: string; label: string; image: string };

export const navItems: NavItem[] = [
  { id: "lugar", label: "El lugar", image: "/media/clear-water.webp" },
  { id: "momentos", label: "Momentos", image: "/media/palm-path.webp" },
  { id: "estadia", label: "Estadía", image: "/media/room.webp" },
  { id: "noche", label: "De noche", image: "/media/bonfire.webp" },
  { id: "espacios", label: "Espacios", image: "/media/pool.webp" },
  { id: "reserva", label: "Reservar", image: "/media/lookout.webp" },
];
export const pillars = [
  {
    title: "Selva",
    text: "El bosque del Chocó llega hasta la arena. Sombra natural, pájaros y ese aire húmedo que baja el ritmo.",
  },
  {
    title: "Mar turquesa",
    text: "Agua tranquila y transparente sobre el arrecife, para nadar, flotar o mirar el fondo desde la orilla.",
  },
  {
    title: "Desconexión",
    text: "Columpios frente al mar, palmeras y días sin agenda. Lo único pendiente es el atardecer.",
  },
];

export type Moment = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  ratio: string;
  width: string;
  align: string;
};

export const moments: Moment[] = [
  {
    src: "/media/shore-house.webp",
    alt: "Agua turquesa transparente frente a una casa entre palmeras",
    title: "Agua de vidrio",
    caption: "Se ve el fondo desde la lancha.",
    ratio: "aspect-[3/4]",
    width: "lg:w-[24vw]",
    align: "lg:self-start",
  },
  {
    src: "/media/swings.webp",
    alt: "Columpios de madera frente al mar turquesa",
    title: "Columpios sobre la arena",
    caption: "La foto que todos se llevan.",
    ratio: "aspect-[4/5]",
    width: "lg:w-[26vw]",
    align: "lg:self-end",
  },
  {
    src: "/media/palm-path.webp",
    alt: "Camino bajo una palmera que termina en el mar azul",
    title: "Camino al mar",
    caption: "Diez pasos y ya estás en la orilla.",
    ratio: "aspect-[3/4]",
    width: "lg:w-[24vw]",
    align: "lg:self-center",
  },
  {
    src: "/media/aerial.webp",
    alt: "Vista aérea del arrecife, la playa y la piscina entre la selva",
    title: "Desde arriba",
    caption: "Arrecife, playa y selva en una sola línea.",
    ratio: "aspect-[16/10]",
    width: "lg:w-[38vw]",
    align: "lg:self-start",
  },
  {
    src: "/media/palm-lawn.webp",
    alt: "Sendero de pasto bajo palmeras junto al mar",
    title: "Mañanas lentas",
    caption: "Sombra de palmera y brisa de mar.",
    ratio: "aspect-[4/5]",
    width: "lg:w-[26vw]",
    align: "lg:self-end",
  },
  {
    src: "/media/lookout.webp",
    alt: "Vista de la bahía azul desde un mirador en la selva",
    title: "El mirador",
    caption: "La bahía completa desde arriba.",
    ratio: "aspect-[3/4]",
    width: "lg:w-[24vw]",
    align: "lg:self-center",
  },
  {
    src: "/media/pool.webp",
    alt: "Jacuzzi y piscina con tobogán rodeados de palmeras",
    title: "Piscina y tobogán",
    caption: "Para cuando el mar ya fue suficiente.",
    ratio: "aspect-[3/4]",
    width: "lg:w-[24vw]",
    align: "lg:self-start",
  },
];

export type Space = { src: string; alt: string; title: string; text: string };

export const spaces: Space[] = [
  { src: "/media/espacios/la-playa.webp", alt: "Playa de arena clara con palmeras y selva hasta la orilla", title: "La playa", text: "Arena clara, palmeras y selva hasta la orilla." },
  { src: "/media/espacios/agua-cristalina.webp", alt: "Agua turquesa transparente con el fondo del mar a la vista", title: "Agua cristalina", text: "Se ve el fondo desde la lancha." },
  { src: "/media/espacios/palmeras.webp", alt: "Sendero de pasto a la sombra de palmeras junto al mar", title: "Bajo las palmeras", text: "Sombra natural a pasos del agua." },
  { src: "/media/espacios/mesas-en-la-arena.webp", alt: "Mesas y sillas de colores en la arena bajo las palmeras", title: "Mesas en la arena", text: "Almuerzo con los pies en la playa." },
  { src: "/media/espacios/mirador.webp", alt: "Bahía azul vista desde un mirador entre la selva", title: "El mirador", text: "La bahía completa desde arriba." },
  { src: "/media/espacios/lanchas.webp", alt: "Lancha amarrada al muelle con la selva detrás", title: "En lancha", text: "Así se llega: por mar, entre selva." },
  { src: "/media/espacios/habitaciones.webp", alt: "Habitación con paredes de madera y dos camas dobles", title: "Habitaciones", text: "Madera, aire acondicionado y camas listas." },
  { src: "/media/espacios/fogata.webp", alt: "Fogata encendida en la playa bajo luces colgantes", title: "Fogata", text: "Luces, arena tibia y fuego bajo las estrellas." },
];
