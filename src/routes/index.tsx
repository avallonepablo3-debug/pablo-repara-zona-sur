import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import baLav from "@/assets/ba-lavarropas.jpg";
import baHel from "@/assets/ba-heladera.jpg";

// TODO: reemplazar con el número real de Pablo Service (formato internacional sin +)
const WA_NUMBER = "5491100000000";
const WA_MSG =
  "Hola Pablo Service, vi tu página y necesito una reparación. ¿Podrías coordinar una visita sin cargo?";
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MSG)}`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pablo Service | Técnico de Electrodomésticos Zona Sur" },
      { name: "description", content: "Reparación de heladeras, lavarropas, lavavajillas y hornos en Zona Sur. Visita sin cargo, reparación en el día y 3 meses de garantía." },
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

function WaButton({ label, size = "lg" }: { label: string; size?: "lg" | "md" }) {
  const s = size === "lg" ? "px-7 py-4 text-lg" : "px-5 py-3 text-base";
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-cta font-bold text-cta-foreground shadow-cta transition-transform hover:scale-[1.03] active:scale-95 ${s}`}
    >
      <WaIcon /> {label}
    </a>
  );
}

const trust = [
  { icon: "🏠", t: "Visita sin costo" },
  { icon: "🏆", t: "30+ Años de Exp." },
  { icon: "🛡️", t: "Garantía 3 Meses" },
  { icon: "⚡", t: "Reparación en el Día" },
];

const problems = [
  { icon: "❄️", t: "Refrigeración", q: [[Snowflake, "¿No enfría abajo?"], [Box, "¿Forma hielo?"], [Volume2, "¿Hace mucho ruido?"], [Cog, "¿No para el motor?"]] },
  { icon: "🌀", t: "Lavarropas", q: [[Droplet, "¿No carga agua?"], [Droplets, "¿No desagota?"], [Volume2, "¿Hace ruidos extraños?"]] },
  { icon: "🍽️", t: "Lavavajillas", q: [[Thermometer, "¿No calienta?"], [Sparkles, "¿No lava bien?"], [Droplets, "¿No desagota?"]] },
  { icon: "🔥", t: "Hornos Eléctricos", q: [[Flame, "¿No calienta?"], [Power, "¿No enciende?"]] },
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
    <main className="pb-24">
      {/* ANNOUNCEMENT */}
      <div className="bg-accent py-2 text-center text-xs font-black tracking-wide text-accent-foreground md:text-sm">
        <span className="animate-pulse">⚡ ATENCIÓN DE URGENCIAS HOY MISMO EN ZONA SUR</span>
      </div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero text-primary-foreground">
        <div className="absolute inset-0 industrial-grid" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-6 md:grid-cols-2 md:items-center md:pt-10">
          <div>
            <p className="mb-8 font-display text-xl font-black tracking-tight">
              PABLO<span className="text-accent"> SERVICE</span>
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                ✓ Visita sin cargo
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary-foreground/40 px-3 py-1 text-sm font-bold">
                <MapPin className="h-4 w-4" /> Técnico local en Zona Sur
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">
              Técnico de Electrodomésticos en Zona Sur — <span className="text-accent">Reparación en el Día</span>
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Más de 30 años de experiencia. Visita y diagnóstico sin cargo en tu domicilio.
            </p>
            <div className="mt-7">
              <WaButton label="Pedí tu visita sin cargo ahora" />
            </div>
          </div>
          <img src={hero} alt="Técnico de Pablo Service reparando una heladera" width={1280} height={896} fetchPriority="high" className="w-full rounded-xl shadow-2xl" />
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-5 py-6 md:grid-cols-4">
          {trust.map((x) => (
            <div key={x.t} className="flex flex-col items-center gap-1 text-center">
              <span className="text-3xl">{x.icon}</span>
              <span className="font-display text-sm font-bold text-primary">{x.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="text-center text-3xl font-black text-primary">¿Qué le pasa a tu electrodoméstico?</h2>
        <p className="mt-2 text-center text-muted-foreground">Contanos el síntoma, nosotros lo solucionamos hoy.</p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <article key={p.t} className="flex flex-col rounded-xl border-t-4 border-t-accent bg-card p-6 shadow-sm">
              <span className="text-4xl">{p.icon}</span>
              <h3 className="mt-3 text-xl font-black text-primary">{p.t}</h3>
              <ul className="mt-3 flex-1 space-y-1.5">
                {p.q.map((q) => (
                  <li key={q} className="text-foreground">• {q}</li>
                ))}
              </ul>
              <div className="mt-5">
                <WaButton label="Solucionalo ahora" size="md" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PROOF */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-black text-primary">Trabajos Realizados</h2>
          <p className="mt-2 text-center text-muted-foreground">Antes y después de nuestras reparaciones.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[{ img: baLav, t: "Lavarropas — cambio de bomba y limpieza total" }, { img: baHel, t: "Heladera — cambio de motocompresor" }].map((w) => (
              <figure key={w.t} className="overflow-hidden rounded-xl bg-card shadow-sm">
                <img src={w.img} alt={w.t} width={1024} height={768} loading="lazy" className="w-full" />
                <figcaption className="p-4 font-semibold text-primary">{w.t}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h2 className="text-3xl font-black text-primary">Confianza y Trayectoria</h2>
        <p className="mt-5 text-lg text-foreground">
          Hace <strong>más de 30 años</strong> que reparamos electrodomésticos en los hogares de Zona Sur.
          Trabajamos con <strong>honestidad</strong>: te decimos qué tiene tu equipo y cuánto cuesta, sin vueltas.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["30+", "años de oficio"],
            ["Directo", "con el técnico, sin intermediarios"],
            ["100%", "presupuesto claro antes de reparar"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-xl bg-primary p-5 text-primary-foreground">
              <p className="font-display text-3xl font-black text-accent">{n}</p>
              <p className="mt-1 text-sm">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary py-16">
        <div className="mx-auto max-w-3xl px-5">
          <h2 className="text-center text-3xl font-black text-primary">Preguntas Frecuentes</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl bg-card p-5 shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between font-display font-bold text-primary">
                  {f.q}
                  <span className="text-2xl text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <footer className="relative overflow-hidden bg-hero px-5 py-20 text-center text-primary-foreground">
        <div className="absolute inset-0 industrial-grid" />
        <div className="relative mx-auto max-w-3xl">
          <h2 className="text-3xl font-black md:text-4xl">¿Tu electrodoméstico dejó de funcionar?</h2>
          <p className="mt-3 text-xl text-accent font-bold">No pierdas tiempo.</p>
          <div className="mt-8">
            <WaButton label="Pedí tu visita sin cargo ahora" />
          </div>
          <p className="mt-10 text-sm opacity-70">© Pablo Service — Servicio Técnico · Zona Sur, Buenos Aires</p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-card/95 p-3 backdrop-blur md:hidden">
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-cta py-4 text-lg font-bold text-cta-foreground shadow-cta">
          <WaIcon /> Pedí tu visita sin cargo
        </a>
      </div>
      {/* STICKY DESKTOP FLOAT */}
      <a href={WA_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-6 right-6 z-50 hidden h-16 w-16 items-center justify-center rounded-full bg-cta text-cta-foreground shadow-cta transition-transform hover:scale-110 md:flex">
        <WaIcon className="h-8 w-8" />
      </a>
    </main>
  );
}
