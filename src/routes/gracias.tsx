import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { WA_URL } from "@/routes/index";

const metaPixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;
const gAdsId = import.meta.env.VITE_GADS_ID as string | undefined;
const gAdsLabel = import.meta.env.VITE_GADS_CONVERSION_LABEL as string | undefined;

type TrackingWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

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
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const trackingWindow = window as TrackingWindow;
    let redirected = false;
    const redirect = () => {
      if (redirected) return;
      redirected = true;
      window.location.assign(WA_URL);
    };

    if (metaPixelId && trackingWindow.fbq) {
      trackingWindow.fbq("track", "Lead");
    }

    if (gAdsId && gAdsLabel && trackingWindow.gtag) {
      trackingWindow.gtag("event", "conversion", {
        send_to: `${gAdsId}/${gAdsLabel}`,
        event_callback: redirect,
      });
    }

    window.setTimeout(redirect, 500);

    if (!metaPixelId && !(gAdsId && gAdsLabel)) {
      redirect();
    }
  }, []);

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
