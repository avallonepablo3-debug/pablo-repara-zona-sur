import hero1280 from "@/assets/hero-1280.webp";
import hero640 from "@/assets/hero-640.webp";
import job1Antes960 from "@/assets/job1-antes-960.webp";
import job1Antes480 from "@/assets/job1-antes-480.webp";
import job1Despues960 from "@/assets/job1-despues-960.webp";
import job1Despues480 from "@/assets/job1-despues-480.webp";
import job2Antes960 from "@/assets/job2-antes-960.webp";
import job2Antes480 from "@/assets/job2-antes-480.webp";
import job2Despues960 from "@/assets/job2-despues-960.webp";
import job2Despues480 from "@/assets/job2-despues-480.webp";

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
    alt: "Taller de Pablo Service con heladeras y lavarropas en reparación",
  } satisfies PhotoAsset,
  beforeAfter: [
    {
      title: "Condensadora",
      caption: "Condensadora",
      before: {
        src: job1Antes960,
        mobileSrc: job1Antes480,
        width: 960,
        height: 720,
        alt: "Condensadora antes de la reparación",
      },
      after: {
        src: job1Despues960,
        mobileSrc: job1Despues480,
        width: 960,
        height: 720,
        alt: "Condensadora después de la reparación",
      },
    },
    {
      title: "Lavarropas",
      caption: "Lavarropas",
      before: {
        src: job2Antes960,
        mobileSrc: job2Antes480,
        width: 960,
        height: 720,
        alt: "Lavarropas antes de la reparación",
      },
      after: {
        src: job2Despues960,
        mobileSrc: job2Despues480,
        width: 960,
        height: 720,
        alt: "Lavarropas después de la reparación",
      },
    },
  ],
} as const;
