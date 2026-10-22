import { createFileRoute } from "@tanstack/react-router";
import { Snowflake, Box, Volume2, Cog, Droplet, Droplets, Thermometer, Sparkles, Flame, Power, MapPin, BadgeCheck, Star, Wrench, Refrigerator, WashingMachine, CookingPot, ShieldCheck, House, Zap, Check, ArrowUpRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import baLav from "@/assets/ba-lavarropas.jpg";
import baHel from "@/assets/ba-heladera.jpg";

const WA_NUMBER = "5491122435375";
const WA_MSG =
  "Hola Pablo Service, vi tu página y necesito una reparación. ¿Podrías coordinar una visita sin cargo?";
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pablo Service | Técnico de Electrodomésticos Zona Sur" },
      { name: "description", content: "Reparación de heladeras, lavarropas, lavavajillas y hornos en Zona Sur. Visita sin cargo, reparación en el día y 3 meses de garantía." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Pablo Service | Técnico de Electrodomésticos Zona Sur" },
      { property: "og:description", content: "Más de 30 años de experiencia. Visita y diagnóstico sin cargo en tu domicilio." },
    ],
  }),
  component: Index,
});

function WaIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.4l5.82-1.53a11.3 11.3 0 0 0 5.62 1.43h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

function WaButton({ label = "Coordinar visita GRATIS ahora 📲", size = "lg", className = "" }: { label?: string; size?: "lg" | "md"; className?: string }) {
  return (
    <Button asChild variant="whatsapp" className={`wa-button ${size === "md" ? "compact" : ""} ${className}`}>
      <a href={WA_URL} target="_blank" rel="noopener noreferrer"><WaIcon /><span>{label}</span></a>
    </Button>
  );
}

const trust = [
  { icon: House, title: "Visita GRATIS", detail: "Diagnóstico sin cargo" },
  { icon: BadgeCheck, title: "30+ Años", detail: "Experiencia que responde" },
  { icon: ShieldCheck, title: "3 Meses", detail: "Garantía por escrito" },
  { icon: Zap, title: "En el día", detail: "Reparación a domicilio" },
];

const problems = [
  { icon: Refrigerator, t: "Refrigeración", q: [[Snowflake, "¿No enfría abajo?"], [Box, "¿Forma hielo?"], [Volume2, "¿Hace mucho ruido?"], [Cog, "¿No para el motor?"]] },
  { icon: WashingMachine, t: "Lavarropas", q: [[Droplet, "¿No carga agua?"], [Droplets, "¿No desagota?"], [Volume2, "¿Hace ruidos extraños?"]] },
  { icon: Sparkles, t: "Lavavajillas", q: [[Thermometer, "¿No calienta?"], [Sparkles, "¿No lava bien?"], [Droplets, "¿No desagota?"]] },
  { icon: CookingPot, t: "Hornos Eléctricos", q: [[Flame, "¿No calienta?"], [Power, "¿No enciende?"]] },
] as const;

const CITIES = ["Lanús", "Lomas de Zamora", "Banfield", "Avellaneda", "Quilmes", "Bernal", "Adrogué", "Burzaco", "Almirante Brown"];

const faqs = [
  { q: "¿Cuánto cuesta la visita?", a: "Nada. La visita y el diagnóstico en tu domicilio son totalmente sin cargo. Solo pagás si aceptás el presupuesto." },
  { q: "¿Tienen garantía los trabajos?", a: "Sí. Todos los trabajos tienen 3 meses de garantía por escrito." },
  { q: "¿En qué zonas trabajan?", a: `Atendemos a domicilio en ${CITIES.slice(0, -1).join(", ")} y ${CITIES[CITIES.length - 1]}.` },
  { q: "¿Qué marcas reparan?", a: "Todas las marcas principales: Whirlpool, Samsung, LG, Drean, Gafa, Electrolux, Patrick, Bosch, Longvie, Peabody y más." },
];

const testimonials = [
  { n: "Ricardo", c: "Banfield", t: "Lo que más valoro es la honestidad. Me explicó qué tenía la heladera y me cobró exactamente lo que me dijo. Nada de sorpresas." },
  { n: "Marta", c: "Lanús", t: "Le escribí a la mañana y a la tarde ya tenía el lavarropas funcionando. Respuesta rapidísima, súper recomendable." },
  { n: "Jorge", c: "Quilmes", t: "Vinieron dos técnicos antes y ninguno pudo con el lavavajillas. Pablo lo solucionó en una hora. Un genio." },
];

function Index() {
  return (
    <main className="pb-24 md:pb-0">
      <div className="bg-accent px-4 py-2.5 text-center text-xs font-extrabold text-accent-foreground sm:text-sm">
        <span className="animate-pulse">⚡ ATENCIÓN DE URGENCIAS HOY MISMO EN ZONA SUR</span>
      </div>
      <header className="bg-card text-primary">
        <div className="page-width flex min-h-24 items-center justify-between gap-4 py-4">
          <div className="brand">
            <Wrench className="brand-icon" strokeWidth={2.5} />
            <div><p className="brand-name">PABLO <span className="text-muted-foreground">SERVICE</span></p><p className="brand-caption">Servicio técnico · Zona Sur</p></div>
          </div>
          <div className="hidden md:block"><WaButton label="Pedí tu visita sin cargo" size="md" /></div>
        </div>
      </header>

      <section className="hero-section">
        <img src={hero} alt="Técnico trabajando en la reparación de una heladera" width={1280} height={896} fetchPriority="high" className="hero-photo" />
        <div className="hero-shade" /><div className="hero-photo-panel" />
        <div className="page-width hero-content relative">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-primary-foreground/40 px-3 py-2 text-xs font-bold uppercase"><MapPin className="h-4 w-4" />Técnico local en Zona Sur</span>
            <span className="inline-flex items-center gap-2 bg-highlight px-3 py-2 text-sm font-extrabold uppercase text-primary"><Check className="h-4 w-4" />Visita sin cargo</span>
          </div>
          <h1 className="hero-title">Técnico de<br />electrodomésticos<br /><span className="text-highlight">en Zona Sur.</span></h1>
          <p className="mb-3 font-display text-3xl font-extrabold uppercase">Reparación en el día. Sin vueltas.</p>
          <p className="hero-copy">Heladeras, lavarropas, lavavajillas y hornos eléctricos. Más de 30 años de experiencia, directo en tu domicilio.</p>
          <div className="mt-7"><WaButton className="hero-cta" /></div>
          <p className="mt-5 flex items-center gap-2 text-sm font-semibold"><ShieldCheck className="h-5 w-5 text-cta" /> Visita y diagnóstico GRATIS · 3 meses de garantía</p>
          <div className="authority-stamp hero-stamp"><strong>30+</strong><span>Años de experiencia</span><Wrench className="mx-auto mt-3 h-6 w-6" /></div>
        </div>
      </section>

      <section className="border-b-4 border-b-accent bg-card" aria-label="Compromisos de Pablo Service">
        <div className="page-width grid grid-cols-2 md:grid-cols-4">
          {trust.map(({ icon: Icon, title, detail }) => <div key={title} className="trust-item"><Icon className="h-8 w-8 shrink-0 text-primary" strokeWidth={2.5} /><div><strong>{title}</strong><p>{detail}</p></div></div>)}
        </div>
        <div className="border-t py-4 text-center"><WaButton label="Solicitar visita sin cargo" size="md" /></div>
      </section>

      <section className="section-space bg-secondary">
        <div className="page-width">
          <div className="section-kicker text-muted-foreground">Servicio técnico especializado</div>
          <h2 className="text-primary">¿Qué le pasa a tu electrodoméstico?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Contanos el síntoma. Pablo se ocupa de la solución.</p>
          <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map(({ icon: Icon, t, q }) => <article key={t} className="catalog-card">
              <div className="catalog-top"><Icon className="h-10 w-10 shrink-0 text-highlight" strokeWidth={1.8} /><h3>{t}</h3></div>
              <div className="catalog-body"><ul className="mb-6 flex-1">{q.map(([Symptom, text]) => <li key={text}><Symptom />{text}</li>)}</ul><WaButton size="md" /></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section-space bg-card">
        <div className="page-width">
          <div className="section-kicker text-muted-foreground">De la falla a la solución</div>
          <h2 className="text-primary">Trabajos realizados</h2>
          <p className="mt-4 text-lg text-muted-foreground">Antes y después de nuestras reparaciones.</p>
          <div className="mt-9 grid gap-8 md:grid-cols-2">
            {[{ img: baLav, t: "Lavarropas", detail: "Cambio de bomba y limpieza total" }, { img: baHel, t: "Heladera", detail: "Cambio de motocompresor" }].map((w) => <figure key={w.t} className="overflow-hidden border bg-secondary shadow-solid">
              <img src={w.img} alt={`${w.t} — ${w.detail}`} width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover" />
              <figcaption className="flex items-center justify-between gap-3 border-t-4 border-t-accent p-5"><div><h3 className="text-2xl uppercase text-primary">{w.t}</h3><p className="mt-1 text-sm font-semibold">{w.detail}</p></div><Wrench className="h-7 w-7 shrink-0 text-primary" /></figcaption>
            </figure>)}
          </div>
          <div className="mt-9 text-center"><WaButton /></div>
        </div>
      </section>

      <section className="section-space bg-primary text-primary-foreground">
        <div className="page-width grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative">
            <img src={hero} alt="Trabajo técnico de reparación de electrodomésticos" width={1280} height={896} loading="lazy" className="profile-photo" />
            <div className="flex items-center justify-between gap-4 border-t-4 border-t-accent bg-steel p-5 text-steel-foreground"><div><p className="font-display text-3xl font-extrabold uppercase">Pablo Service</p><p className="mt-1 text-sm">Servicio técnico a domicilio · Zona Sur</p></div><BadgeCheck className="h-10 w-10 shrink-0 text-highlight" /></div>
          </div>
          <div>
            <div className="section-kicker">Confianza y trayectoria</div>
            <h2>30 años de oficio.<br /><span className="text-highlight">La confianza de tu barrio.</span></h2>
            <p className="mt-6 font-display text-3xl font-bold">“Soy Pablo.”</p>
            <p className="mt-3 text-lg leading-relaxed">Llevo <strong>más de 30 años</strong> recorriendo los hogares de Zona Sur. Mi compromiso es la <strong>honestidad</strong>: si tu equipo no tiene arreglo, te lo digo sinceramente antes de cobrarte.</p>
            <p className="mt-4 text-lg leading-relaxed">Cuando me escribís, hablás <strong>directo conmigo</strong>, sin intermediarios ni call centers. El mismo técnico que te atiende es el que repara.</p>
            <div className="mt-6 flex flex-wrap gap-4 border-y border-primary-foreground/25 py-4 text-sm font-bold"><span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-highlight" />Garantía por escrito</span><span className="flex items-center gap-2"><House className="h-5 w-5 text-highlight" />Visita GRATIS</span></div>
            <div className="mt-7"><WaButton label="Hablar directo con Pablo 📲" /></div>
          </div>
        </div>
      </section>

      <section className="section-space bg-secondary">
        <div className="page-width">
          <div className="section-kicker text-muted-foreground">Pablo en tu barrio</div>
          <h2 className="text-primary">Testimonios de clientes</h2>
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {testimonials.map((r) => <figure key={r.n} className="review"><div className="flex items-center justify-between"><div className="flex gap-1 text-accent">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5" fill="currentColor" />)}</div><Quote className="h-7 w-7 text-muted-foreground" /></div><blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{r.t}”</blockquote><figcaption className="mt-6 flex items-center gap-3 border-t pt-5"><div className="flex h-11 w-11 items-center justify-center bg-primary font-display text-2xl font-bold text-primary-foreground">{r.n[0]}</div><div><p className="font-bold text-primary">{r.n}</p><p className="text-sm text-muted-foreground">{r.c} · Zona Sur</p></div></figcaption></figure>)}
          </div>
          <div className="mt-9 text-center"><WaButton /></div>
        </div>
      </section>

      <section className="section-space bg-card">
        <div className="page-width grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><div className="section-kicker text-muted-foreground">Estamos cerca</div><h2 className="text-primary">Zonas de<br />cobertura</h2><p className="mt-4 text-lg text-muted-foreground">Servicio técnico a domicilio en toda Zona Sur. Sin intermediarios. Sin cargo por la visita.</p><div className="mt-6"><WaButton /></div></div>
          <div><div className="mb-5 flex items-center gap-3 text-primary"><MapPin className="h-9 w-9" /><p className="font-display text-3xl font-extrabold uppercase">Zona Sur, Buenos Aires</p></div><ul className="zone-list">{CITIES.map((c) => <li key={c}><MapPin />{c}</li>)}</ul></div>
        </div>
      </section>

      <section className="section-space bg-secondary">
        <div className="page-width grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><div className="section-kicker text-muted-foreground">Sin letra chica</div><h2 className="text-primary">Preguntas<br />frecuentes</h2><p className="mt-4 text-lg text-muted-foreground">Hablá con Pablo y coordiná tu visita.</p><div className="mt-6"><WaButton label="Consultar por WhatsApp" /></div></div>
          <div>{faqs.map((f) => <details key={f.q} className="faq-item group"><summary className="text-primary">{f.q}<span className="text-3xl text-primary transition-transform group-open:rotate-45">+</span></summary><p className="text-muted-foreground">{f.a}</p></details>)}</div>
        </div>
      </section>

      <footer className="section-space border-t-8 border-t-accent bg-steel text-steel-foreground">
        <div className="page-width text-center"><div className="section-kicker justify-center">Pablo Service · Servicio técnico</div><h2 className="text-5xl md:text-6xl">¿Tu electrodoméstico<br />dejó de funcionar?</h2><p className="mt-4 font-display text-3xl font-bold uppercase text-highlight">No pierdas tiempo.</p><div className="mt-8"><WaButton className="hero-cta" /></div><p className="mt-6 text-sm">30+ años de experiencia · Visita sin cargo · 3 meses de garantía</p><div className="mt-12 border-t border-steel-foreground/20 pt-6 text-xs">© Pablo Service — Servicio Técnico · Zona Sur, Buenos Aires</div></div>
      </footer>

      <div className="mobile-contact fixed inset-x-0 bottom-0 z-50 md:hidden"><WaButton label="Coordinar visita GRATIS ahora 📲" /></div>
      <Button asChild variant="whatsapp" className="fixed bottom-6 right-6 z-50 hidden h-16 gap-3 rounded px-5 text-base md:inline-flex [&_svg]:size-7"><a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WaIcon /><span>WhatsApp</span><ArrowUpRight className="h-5 w-5" /></a></Button>
    </main>
  );
}
