import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  Box,
  Building2,
  Check,
  Cog,
  CookingPot,
  Droplet,
  Droplets,
  Flame,
  House,
  MapPin,
  Phone,
  Power,
  Quote,
  Refrigerator,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Thermometer,
  Volume2,
  WashingMachine,
  Wrench,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { PHONE, PHONE_COUNTRY, services, URGENCY_TEXT, WA_MESSAGE } from "@/data/config";
import { coverage } from "@/data/coverage";
import { faqs } from "@/data/faq";
import { photos } from "@/data/photos";
import { testimonials } from "@/data/testimonials";

export const WA_NUMBER = PHONE_COUNTRY;
export const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;

const siteUrl = import.meta.env.VITE_SITE_URL ?? "https://pablo-repara-zona-sur.vercel.app";
const googleReviewsUrl = import.meta.env.VITE_GOOGLE_REVIEWS_URL as string | undefined;

const trust = [
  { icon: House, title: "Visita GRATIS", detail: "Diagnóstico sin cargo" },
  { icon: BadgeCheck, title: "30+ Años", detail: "Experiencia que responde" },
  { icon: ShieldCheck, title: "3 Meses", detail: "Garantía por escrito" },
  { icon: Zap, title: "En el día", detail: "Reparación a domicilio" },
];

const serviceCards = [
  {
    icon: Refrigerator,
    title: "Refrigeración familiar",
    symptoms: [
      [Snowflake, "¿No mantiene el frío?"],
      [Box, "¿Forma hielo?"],
      [Volume2, "¿Hace ruido?"],
      [Cog, "¿El motor no para?"],
    ],
  },
  {
    icon: WashingMachine,
    title: "Lavarropas",
    symptoms: [
      [Droplet, "¿No carga agua?"],
      [Droplets, "¿No desagota?"],
      [Volume2, "¿Hace ruidos extraños?"],
    ],
  },
  {
    icon: Sparkles,
    title: "Lavavajillas",
    symptoms: [
      [Thermometer, "¿No calienta?"],
      [Sparkles, "¿No lava bien?"],
      [Droplets, "¿No desagota?"],
    ],
  },
  {
    icon: CookingPot,
    title: "Hornos eléctricos",
    symptoms: [
      [Flame, "¿No calienta?"],
      [Power, "¿No enciende?"],
    ],
  },
  {
    icon: Building2,
    title: "Equipos comerciales",
    symptoms: [
      [Snowflake, "¿No mantiene el frío?"],
      [Droplets, "¿Gotea agua?"],
      [Power, "¿El motor no para?"],
      [Thermometer, "¿La cámara no llega a temperatura?"],
    ],
  },
] as const;

function WaIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43a9.38 9.38 0 0 1 9.43 9.44c0 5.2-4.24 9.43-9.44 9.43m8.03-17.47A11.3 11.3 0 0 0 12.05.7C5.79.7.7 5.79.7 12.05c0 2 .52 3.95 1.52 5.67L.6 23.4l5.82-1.53a11.3 11.3 0 0 0 5.62 1.43h.01c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

function WaButton({
  label = "Coordinar visita GRATIS ahora 📲",
  size = "lg",
  className = "",
  href = "/gracias",
}: {
  label?: string;
  size?: "lg" | "md";
  className?: string;
  href?: string;
}) {
  const isExternal = href.startsWith("http");

  return (
    <Button asChild variant="whatsapp" className={`wa-button ${size === "md" ? "compact" : ""} ${className}`}>
      <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}>
        <WaIcon />
        <span>{label}</span>
      </a>
    </Button>
  );
}

function CallButton({ className = "" }: { className?: string }) {
  return (
    <Button asChild variant="secondary" className={`secondary-call ${className}`}>
      <a href={`tel:${PHONE}`} aria-label="Llamar ahora a Pablo Service">
        <Phone className="h-5 w-5" />
        <span>Llamar ahora</span>
      </a>
    </Button>
  );
}

function ComparisonSlider({
  before,
  after,
  title,
  caption,
}: {
  before: { src: string; mobileSrc: string; width: number; height: number; alt: string };
  after: { src: string; mobileSrc: string; width: number; height: number; alt: string };
  title: string;
  caption: string;
}) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = (clientX: number) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  useEffect(() => {
    if (!dragging) return;

    const handlePointerMove = (event: PointerEvent) => updatePosition(event.clientX);
    const handlePointerUp = () => setDragging(false);

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dragging]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 5;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - step));
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <figure className="comparison-card">
      <div
        className="comparison-frame"
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-label={`${title} antes y después`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          updatePosition(event.clientX);
        }}
        onKeyDown={handleKeyDown}
      >
        <img src={after.src} srcSet={`${after.mobileSrc} 480w, ${after.src} 960w`} sizes="(max-width: 767px) calc(100vw - 32px), 560px" alt={after.alt} width={after.width} height={after.height} loading="lazy" className="comparison-image comparison-base" />
        <div className="comparison-overlay" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img src={before.src} srcSet={`${before.mobileSrc} 480w, ${before.src} 960w`} sizes="(max-width: 767px) calc(100vw - 32px), 560px" alt={before.alt} width={before.width} height={before.height} loading="lazy" className="comparison-image" />
        </div>
        <div className="comparison-divider" style={{ left: `${position}%` }}>
          <span className="comparison-handle" aria-hidden="true" />
        </div>
        <span className="comparison-label comparison-label-before">Antes</span>
        <span className="comparison-label comparison-label-after">Después</span>
      </div>
      <figcaption className="comparison-caption">
        <div>
          <h3>{title}</h3>
          <p>{caption}</p>
        </div>
        <Wrench className="h-7 w-7 shrink-0 text-primary" />
      </figcaption>
    </figure>
  );
}

export const Route = createFileRoute("/")({
  head: () => {
    const metaDescription =
      "Reparamos heladeras familiares y comerciales, lavarropas, lavavajillas, hornos eléctricos, exhibidoras, cámaras de frío y cavas de vino en Zona Sur.";
    const ogImageUrl = import.meta.env.VITE_OG_IMAGE_URL as string | undefined;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Pablo Service",
      telephone: PHONE,
      url: siteUrl,
      areaServed: ["Zona Sur, Buenos Aires", "Lanús", "Lomas de Zamora", "Banfield", "Quilmes"],
      serviceType: services,
    };

    return {
      meta: [
        { title: "Pablo Service | Técnico de Electrodomésticos Zona Sur" },
        { name: "description", content: metaDescription },
        { property: "og:title", content: "Pablo Service | Técnico de Electrodomésticos Zona Sur" },
        { property: "og:description", content: metaDescription },
        ...(ogImageUrl
          ? [
              { property: "og:image", content: ogImageUrl },
              { property: "og:image:width", content: "1200" },
              { property: "og:image:height", content: "630" },
            ]
          : []),
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(jsonLd),
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  return (
    <main className="conversion-page flex flex-col">
      <div className="urgency-bar order-0 bg-accent px-4 py-2.5 text-center font-extrabold text-accent-foreground">
        <span>{URGENCY_TEXT}</span>
      </div>

      <header className="mobile-header order-1 bg-card text-primary">
        <div className="page-width grid min-h-24 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4">
          <div className="brand">
            <Wrench className="brand-icon" strokeWidth={2.5} />
            <div>
              <p className="brand-name">
                PABLO <span className="text-muted-foreground">SERVICE</span>
              </p>
              <p className="brand-caption">Servicio técnico · Zona Sur</p>
            </div>
          </div>
          <Button asChild variant="whatsapp" className="mobile-quick-contact md:hidden">
            <a href="/gracias" aria-label="Coordinar visita gratis por WhatsApp">
              <WaIcon />
            </a>
          </Button>
          <div className="hidden md:block">
            <WaButton label="Pedí tu visita sin cargo" size="md" href="/gracias" />
          </div>
        </div>
      </header>

      <section className="hero-section order-2">
        <img
          src={photos.hero.src}
          srcSet={`${photos.hero.mobileSrc} 640w, ${photos.hero.src} 1280w`}
          sizes="100vw"
          alt={photos.hero.alt}
          width={photos.hero.width}
          height={photos.hero.height}
          fetchPriority="high"
          className="hero-photo"
        />
        <div className="hero-shade" />
        <div className="hero-photo-panel" />
        <div className="page-width hero-content relative">
          <div className="hero-badges flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 border border-primary-foreground/40 px-3 py-2 text-xs font-bold uppercase">
              <MapPin className="h-4 w-4" />
              Técnico local en Zona Sur
            </span>
            <span className="inline-flex items-center gap-2 bg-highlight px-3 py-2 text-sm font-extrabold uppercase text-primary">
              <Check className="h-4 w-4" />
              Visita sin cargo
            </span>
          </div>

          <h1 className="hero-title">
            Técnico de
            <br />
            electrodomésticos
            <br />
            <span className="text-highlight">en Zona Sur.</span>
          </h1>
          <p className="mb-3 font-display text-3xl font-extrabold uppercase">Reparación en el día. Sin vueltas.</p>
          <p className="hero-copy">
            Heladeras familiares y comerciales, lavarropas, lavavajillas, hornos eléctricos, exhibidoras, cámaras de frío y cavas de vino.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <WaButton className="hero-cta" href="/gracias" />
            <CallButton className="hero-call" />
            <Button asChild variant="secondary" className="secondary-scroll-link">
              <a href="#servicios">Ver qué reparamos</a>
            </Button>
          </div>

          <p className="hero-guarantee mt-5 flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-5 w-5 shrink-0 text-cta" />
            <span>Visita y diagnóstico GRATIS · 3 meses de garantía</span>
          </p>
          <div className="authority-stamp hero-stamp">
            <strong>30+</strong>
            <span>Años de experiencia</span>
            <Wrench className="mx-auto mt-3 h-6 w-6" />
          </div>
        </div>
      </section>

      <section className="order-3 border-b-4 border-b-accent bg-card" aria-label="Compromisos de Pablo Service">
        <div className="page-width grid grid-cols-1 md:grid-cols-4">
          {trust.map(({ icon: Icon, title, detail }) => (
            <div key={title} className="trust-item">
              <Icon className="h-8 w-8 shrink-0 text-primary" strokeWidth={2.5} />
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t py-4 text-center">
          <WaButton label="Solicitar visita sin cargo" size="md" href="/gracias" />
        </div>
      </section>

      <section id="servicios" className="section-space order-4 bg-secondary">
        <div className="page-width">
          <div className="section-kicker text-muted-foreground">Servicio técnico especializado</div>
          <h2 className="text-primary">¿Qué le pasa a tu electrodoméstico?</h2>
          <p className="mt-4 text-lg text-muted-foreground">Contanos el síntoma. Pablo se ocupa de la solución.</p>
          <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {serviceCards.map(({ icon: Icon, title, symptoms }) => (
              <article key={title} className="catalog-card">
                <div className="catalog-top">
                  <Icon className="h-10 w-10 shrink-0 text-highlight" strokeWidth={1.8} />
                  <h3>{title}</h3>
                </div>
                <div className="catalog-body">
                  <ul className="mb-6 flex-1">
                    {symptoms.map(([Symptom, text]) => (
                      <li key={text}>
                        <Symptom />
                        {text}
                      </li>
                    ))}
                  </ul>
                  <WaButton size="md" href="/gracias" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space order-6 bg-card md:order-5">
        <div className="page-width">
          <div className="section-kicker text-muted-foreground">De la falla a la solución</div>
          <h2 className="text-primary">Trabajos realizados</h2>
          <p className="mt-4 text-lg text-muted-foreground">Antes y después de nuestras reparaciones.</p>
          <div className="mt-9 grid gap-8 md:grid-cols-2">
            {photos.beforeAfter.map((job) => (
              <ComparisonSlider
                key={job.title}
                before={job.before}
                after={job.after}
                title={job.title}
                caption={job.caption}
              />
            ))}
          </div>
          <div className="mt-9 text-center">
            <WaButton href="/gracias" />
          </div>
        </div>
      </section>

      <section className="section-space order-7 bg-primary text-primary-foreground md:order-6">
        <div className="page-width grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div className="relative">
            <img
              src={photos.profile.src}
              srcSet={`${photos.profile.mobileSrc} 480w, ${photos.profile.src} 960w`}
              sizes="(max-width: 767px) calc(100vw - 32px), 540px"
              decoding="async"
              alt={photos.profile.alt}
              width={photos.profile.width}
              height={photos.profile.height}
              loading="lazy"
              className="profile-photo"
            />
            <div className="flex items-center justify-between gap-4 border-t-4 border-t-accent bg-steel p-5 text-steel-foreground">
              <div>
                <p className="font-display text-3xl font-extrabold uppercase">Pablo Service</p>
                <p className="mt-1 text-sm">Servicio técnico a domicilio · Zona Sur</p>
              </div>
              <BadgeCheck className="h-10 w-10 shrink-0 text-highlight" />
            </div>
          </div>
          <div>
            <div className="section-kicker">Confianza y trayectoria</div>
            <h2>
              30 años de oficio.
              <br />
              <span className="text-highlight">La confianza de tu barrio.</span>
            </h2>
            <p className="mt-6 font-display text-3xl font-bold">“Soy Pablo.”</p>
            <p className="mt-3 text-lg leading-relaxed">
              Llevo <strong>más de 30 años</strong> trabajando con heladeras familiares y comerciales, lavarropas,
              lavavajillas, hornos eléctricos, exhibidoras, cámaras de frío y cavas de vino. Mi compromiso es la
              <strong> honestidad</strong>: si tu equipo no tiene arreglo, te lo digo sinceramente antes de cobrarte.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Cuando me escribís, hablás <strong>directo conmigo</strong>, sin intermediarios ni call centers. El mismo técnico que te atiende es el que repara.
            </p>
            <div className="profile-promises mt-6 flex flex-wrap gap-4 border-y border-primary-foreground/25 py-4 text-sm font-bold">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-highlight" />
                Garantía por escrito
              </span>
              <span className="flex items-center gap-2">
                <House className="h-5 w-5 text-highlight" />
                Visita GRATIS
              </span>
            </div>
            <div className="mt-7">
              <WaButton label="Hablar directo con Pablo 📲" href="/gracias" />
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section-space order-5 bg-secondary md:order-7">
          <div className="page-width">
            <div className="section-kicker text-muted-foreground">Pablo en tu barrio</div>
            <h2 className="text-primary">Testimonios de clientes</h2>
            <div className="mt-9 grid gap-6 md:grid-cols-3">
              {testimonials.map((review) => (
                <figure key={`${review.name}-${review.barrio}`} className="review">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-accent">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Star key={i} className="h-5 w-5" fill="currentColor" />
                      ))}
                    </div>
                    <Quote className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{review.text}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                    <div className="flex h-11 w-11 items-center justify-center bg-primary font-display text-2xl font-bold text-primary-foreground">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-primary">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.barrio} {review.source ? `· ${review.source}` : "· Zona Sur"}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-9 text-center">
              <WaButton href="/gracias" />
            </div>
          </div>
        </section>
      )}

      {coverage.length > 0 && (
        <section className="section-space order-8 bg-card">
          <div className="page-width grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="section-kicker text-muted-foreground">Estamos cerca</div>
              <h2 className="text-primary">
                Zonas de
                <br />
                cobertura
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Servicio técnico a domicilio en la zona sur. Sin intermediarios. Sin cargo por la visita.
              </p>
              <div className="mt-6">
                <WaButton href="/gracias" />
              </div>
            </div>
            <div>
              <div className="mb-5 flex items-center gap-3 text-primary">
                <MapPin className="h-9 w-9" />
                <p className="font-display text-3xl font-extrabold uppercase">Zona Sur, Buenos Aires</p>
              </div>
              <ul className="zone-list">
                {coverage.map((city) => (
                  <li key={city}>
                    <MapPin />
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="section-space order-9 bg-secondary">
        <div className="page-width grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <div className="section-kicker text-muted-foreground">Preguntas frecuentes</div>
            <h2 className="text-primary">Todo lo que necesitás saber</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Si tenés dudas antes de escribir, acá está la información más útil.
            </p>
            <div className="mt-7">
              <WaButton label="Hablar por WhatsApp" href="/gracias" />
            </div>
          </div>
          <div>
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>
                  <span>{faq.q}</span>
                  <ArrowUpRight className="h-6 w-6 shrink-0 text-primary" />
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="order-10 bg-primary pb-28 pt-16 text-primary-foreground md:pb-20">
        <div className="page-width">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-kicker text-primary-foreground/80">Pablo Service</div>
              <h2>Reparo lo que te hace falta.</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <WaButton label="Solicitar reparación" href="/gracias" />
              {googleReviewsUrl ? (
                <Button asChild variant="secondary" className="secondary-scroll-link">
                  <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
                    Ver opiniones en Google
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-6 border-t border-primary-foreground/15 pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-3xl font-extrabold uppercase">Servicio técnico en Zona Sur</p>
              <p className="mt-2 text-base text-primary-foreground/80">Atención por WhatsApp y llamadas directas.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 font-bold text-primary-foreground hover:text-highlight">
                <Phone className="h-4 w-4" />
                {PHONE}
              </a>
              <a href="/gracias" className="inline-flex items-center gap-2 font-bold text-primary-foreground hover:text-highlight">
                <WaIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="mobile-contact md:hidden">
        <div className="grid grid-cols-[1.35fr_0.65fr] gap-2">
          <WaButton label="WhatsApp" size="md" href="/gracias" className="mobile-whatsapp-button" />
          <CallButton className="mobile-call-button" />
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return <Index />;
}
