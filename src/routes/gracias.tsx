import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { WA_URL } from "@/routes/index";

const metaPixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const gAdsId = import.meta.env.VITE_GADS_ID as string | undefined;
const gAdsLabel = import.meta.env.VITE_GADS_CONVERSION_LABEL as string | undefined;

export const Route = createFileRoute("/gracias")({
  head: () => ({
    meta: [
      { title: "Gracias | Pablo Service" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Gracias,
});

function Gracias() {
  const [redirecting, setRedirecting] = useState(true);

  useEffect(() => {
    const redirect = () => {
      setRedirecting(false);
      window.location.assign(WA_URL);
    };

    const gtagAvailable = typeof window !== "undefined" && typeof (window as any).gtag === "function";
    const fbqAvailable = typeof window !== "undefined" && typeof (window as any).fbq === "function";

    if (metaPixelId && fbqAvailable) {
      (window as any).fbq("track", "Lead", {}, { eventCallback: redirect });
    }

    if (gAdsId && gAdsLabel && gtagAvailable) {
      (window as any).gtag("event", "conversion", {
        send_to: `${gAdsId}/${gAdsLabel}`,
      });
    }

    const timer = window.setTimeout(() => {
      if (redirecting) {
        redirect();
      }
    }, 500);

    if (!metaPixelId && !gAdsId) {
      redirect();
    }

    return () => window.clearTimeout(timer);
  }, [redirecting]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-secondary px-4 py-12 text-foreground">
      <div className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-solid">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">Pablo Service</p>
        <h1 className="text-5xl font-black uppercase text-primary">¡Gracias!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Te estamos llevando a WhatsApp para coordinar la reparación y responder tu consulta al instante.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild variant="whatsapp" className="wa-button">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer">
              Abrir WhatsApp
            </a>
          </Button>
          <Button asChild variant="secondary" className="secondary-scroll-link">
            <a href="/">Volver al inicio</a>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Si no se abre la conversación, usá el botón de arriba.</p>
      </div>
    </main>
  );
}
