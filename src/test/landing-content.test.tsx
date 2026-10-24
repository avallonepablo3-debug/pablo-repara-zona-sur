import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home, { WA_URL } from "@/routes/index";
import { graciasHead, WhatsAppFallback } from "@/routes/gracias";
import { photos } from "@/data/photos";

function getSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      return entry.name === "test" ? [] : getSourceFiles(entryPath);
    }
    return /\.(ts|tsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

describe("landing page content", () => {
  it("exposes the commercial equipment service card", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: "Equipos comerciales" })).toBeInTheDocument();
  });

  it("shows the Pablo Service logo on its blue header tile", () => {
    render(<Home />);

    expect(screen.getByRole("img", { name: "Pablo Service" })).toHaveClass("brand-icon");
  });

  it("shows the supplied review locations without invented source labels or stars", () => {
    render(<Home />);

    for (const barrio of ["Banfield", "Lomas de Zamora", "Lanús"]) {
      expect(screen.getByText(barrio, { selector: ".review figcaption p" })).toBeInTheDocument();
    }
    expect(document.querySelectorAll(".review .text-accent svg")).toHaveLength(0);
    expect(screen.queryByText("· Zona Sur")).not.toBeInTheDocument();
  });

  it("limits visible coverage and the barrios FAQ to the confirmed localities", () => {
    render(<Home />);

    for (const barrio of ["Lomas de Zamora", "Banfield", "Lanús"]) {
      expect(screen.getByText(barrio, { selector: ".zone-list li" })).toBeInTheDocument();
    }
    expect(screen.queryByText("Quilmes")).not.toBeInTheDocument();
    expect(screen.getByText("Atendemos en Lomas de Zamora, Banfield y Lanús.")).toBeInTheDocument();
  });

  it("shows the confirmed brand and payment answers", () => {
    render(<Home />);

    expect(screen.getByText("Sí, Pablo repara todas las marcas.")).toBeInTheDocument();
    expect(screen.getByText("Pablo acepta todos los medios de pago.")).toBeInTheDocument();
  });

  it("uses the correct generated before/after photo pairs and neutral captions", () => {
    expect(photos.hero.alt).toBe("Taller de Pablo Service con heladeras y lavarropas en reparación");
    expect(Object.keys(photos)).not.toContain("profile");
    expect(photos.beforeAfter.map(({ caption }) => caption)).toEqual(["Condensadora", "Lavarropas"]);
    expect(photos.beforeAfter[0].before.src).toContain("job1-antes-960");
    expect(photos.beforeAfter[0].after.src).toContain("job1-despues-960");
    expect(photos.beforeAfter[1].before.src).toContain("job2-antes-960");
    expect(photos.beforeAfter[1].after.src).toContain("job2-despues-960");
  });

  it("keeps the trust section centered in one text-only column", () => {
    render(<Home />);

    const heading = screen.getByText("Confianza y trayectoria");
    const section = heading.closest("section");
    expect(section?.querySelector(".mx-auto.max-w-3xl")).toBeInTheDocument();
    expect(section?.querySelector("img")).not.toBeInTheDocument();
    expect(section?.querySelector(".bg-steel")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Hablar directo con Pablo/ })).toBeInTheDocument();
  });

  it("offers contact only through WhatsApp and uses the full-width sticky CTA", () => {
    render(<Home />);

    expect(screen.queryByRole("link", { name: /llamar/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href^="tel:"]')).not.toBeInTheDocument();
    expect(screen.getByText("Atención por WhatsApp.")).toBeInTheDocument();
    expect(screen.queryByText("Atención por WhatsApp y llamadas directas.")).not.toBeInTheDocument();

    const stickyBar = document.querySelector(".mobile-contact");
    expect(stickyBar?.querySelectorAll(".wa-button")).toHaveLength(1);
    expect(stickyBar?.querySelector(".wa-button")).toHaveTextContent("WhatsApp");
  });

  it("keeps /gracias noindex and its WhatsApp fallback on WA_URL", () => {
    expect(graciasHead().meta).toContainEqual({
      name: "robots",
      content: "noindex, nofollow",
    });

    render(<WhatsAppFallback />);
    expect(screen.getByRole("link", { name: "Abrir WhatsApp" })).toHaveAttribute("href", WA_URL);
  });

  it("keeps direct wa.me URLs only in the WA_URL declaration", () => {
    const sourceRoot = resolve(process.cwd(), "src");
    const indexFile = resolve(sourceRoot, "routes", "index.tsx");
    const directLinks = getSourceFiles(sourceRoot).flatMap((file) =>
      readFileSync(file, "utf8")
        .split(/\r?\n/)
        .filter((line) => line.includes("https://wa.me/"))
        .map((line) => ({ file: resolve(file), line: line.trim() })),
    );

    expect(directLinks).toHaveLength(1);
    expect(directLinks[0].file).toBe(indexFile);
    expect(directLinks[0].line).toMatch(/^export const WA_URL = /);
  });
});
