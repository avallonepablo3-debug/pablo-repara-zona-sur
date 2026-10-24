import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home, { WA_URL } from "@/routes/index";
import { graciasHead, WhatsAppFallback } from "@/routes/gracias";

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
