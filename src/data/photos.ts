import hero1280 from "@/assets/hero-1280.webp";
import hero640 from "@/assets/hero-640.webp";
import baLav960 from "@/assets/ba-lavarropas-960.webp";
import baLav480 from "@/assets/ba-lavarropas-480.webp";
import baHel960 from "@/assets/ba-heladera-960.webp";
import baHel480 from "@/assets/ba-heladera-480.webp";

export type PhotoAsset = {
  src: string;
  mobileSrc: string;
  width: number;
  height: number;
  alt: string;
};

export const photos = {
  hero: {
    src: hero1280,
    mobileSrc: hero640,
    width: 1280,
    height: 896,
    alt: "Pablo Service revisando un electrodoméstico en Zona Sur",
  } satisfies PhotoAsset,
  profile: {
    src: baHel960,
    mobileSrc: baHel480,
    width: 960,
    height: 720,
    alt: "Pablo atendiendo una heladera en el hogar del cliente",
  } satisfies PhotoAsset,
  beforeAfter: [
    {
      title: "Lavarropas",
      caption: "Cambio de bomba y limpieza total",
      before: {
        src: baLav960,
        mobileSrc: baLav480,
        width: 960,
        height: 720,
        alt: "Lavarropas antes de la reparación",
      },
      after: {
        src: baHel960,
        mobileSrc: baHel480,
        width: 960,
        height: 720,
        alt: "Lavarropas después de la reparación",
      },
    },
    {
      title: "Heladera",
      caption: "Cambio de motocompresor",
      before: {
        src: baHel960,
        mobileSrc: baHel480,
        width: 960,
        height: 720,
        alt: "Heladera antes de la reparación",
      },
      after: {
        src: baLav960,
        mobileSrc: baLav480,
        width: 960,
        height: 720,
        alt: "Heladera después de la reparación",
      },
    },
  ],
} as const;
