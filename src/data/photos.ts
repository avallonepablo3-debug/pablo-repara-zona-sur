import hero1280Fallback from "@/assets/hero-1280.webp";
import hero640Fallback from "@/assets/hero-640.webp";
import baLav960Fallback from "@/assets/ba-lavarropas-960.webp";
import baLav480Fallback from "@/assets/ba-lavarropas-480.webp";
import baHel960Fallback from "@/assets/ba-heladera-960.webp";
import baHel480Fallback from "@/assets/ba-heladera-480.webp";

const generatedPhotos = import.meta.glob<string>("../assets/*.webp", {
  eager: true,
  import: "default",
});

function photo(name: string, fallback: string): string {
  return generatedPhotos[`../assets/${name}`] ?? fallback;
}

export type PhotoAsset = {
  src: string;
  mobileSrc: string;
  width: number;
  height: number;
  alt: string;
};

export const photos = {
  hero: {
    src: photo("hero-1280.webp", hero1280Fallback),
    mobileSrc: photo("hero-640.webp", hero640Fallback),
    width: 1280,
    height: 896,
    alt: "Pablo Service revisando un electrodoméstico en Zona Sur",
  } satisfies PhotoAsset,
  profile: {
    src: photo("profile-960.webp", baHel960Fallback),
    mobileSrc: photo("profile-480.webp", baHel480Fallback),
    width: 960,
    height: 720,
    alt: "Pablo atendiendo una heladera en el hogar del cliente",
  } satisfies PhotoAsset,
  beforeAfter: [
    {
      title: "Lavarropas",
      caption: "Lavarropas",
      before: {
        src: photo("job1-antes-960.webp", baLav960Fallback),
        mobileSrc: photo("job1-antes-480.webp", baLav480Fallback),
        width: 960,
        height: 720,
        alt: "Lavarropas antes de la reparación",
      },
      after: {
        src: photo("job1-despues-960.webp", baLav960Fallback),
        mobileSrc: photo("job1-despues-480.webp", baLav480Fallback),
        width: 960,
        height: 720,
        alt: "Lavarropas después de la reparación",
      },
    },
    {
      title: "Heladera",
      caption: "Heladera",
      before: {
        src: photo("job2-antes-960.webp", baHel960Fallback),
        mobileSrc: photo("job2-antes-480.webp", baHel480Fallback),
        width: 960,
        height: 720,
        alt: "Heladera antes de la reparación",
      },
      after: {
        src: photo("job2-despues-960.webp", baHel960Fallback),
        mobileSrc: photo("job2-despues-480.webp", baHel480Fallback),
        width: 960,
        height: 720,
        alt: "Heladera después de la reparación",
      },
    },
  ],
} as const;
