export const testimonials: Array<{
  name: string;
  barrio: string;
  text: string;
  photo?: string;
  source?: "Google" | "WhatsApp";
}> = [
  {
    name: "Ricardo",
    barrio: "Banfield",
    text: "Lo que más valoro es la honestidad. Me explicó qué tenía la heladera y me cobró exactamente lo que me dijo. Nada de sorpresas.",
  },
  {
    name: "Marta",
    barrio: "Lomas de Zamora",
    text: "Le escribí a la mañana y a la tarde ya tenía el lavarropas funcionando. Respuesta rapidísima, súper recomendable.",
  },
  {
    name: "Jorge",
    barrio: "Lanús",
    text: "Vinieron dos técnicos antes y ninguno pudo con el lavavajillas. Pablo lo solucionó en una hora. Un genio.",
  },
];
