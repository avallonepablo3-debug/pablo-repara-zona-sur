import { describe, expect, it } from "vitest";
import { WA_URL } from "@/routes/index";

describe("Pablo's WhatsApp contact", () => {
  it("uses the real number and exact requested message", () => {
    expect(WA_URL).toBe("https://wa.me/5491122435375?text=Hola%20Pablo%20Service%2C%20vi%20tu%20p%C3%A1gina%20y%20necesito%20una%20reparaci%C3%B3n.%20%C2%BFPodr%C3%ADas%20coordinar%20una%20visita%20sin%20cargo%3F");
  });
});