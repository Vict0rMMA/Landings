"use client";

import { useRef } from "react";
import CtaLink from "@/components/CtaLink";
import RevealImage from "@/components/RevealImage";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappLink } from "@/data/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const notes = ["Paredes de madera", "Aire acondicionado", "Camas dobles", "A pasos de la playa"];

export default function Stay() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // El marco del video se abre a medida que entra.
        gsap.fromTo(
          "[data-stay-frame]",
          { clipPath: "inset(16% 14% 16% 14% round 999px)" },
          { clipPath: "inset(0% 0% 0% 0% round 6px)", ease: "none", scrollTrigger: { trigger: "[data-stay-frame]", start: "top 95%", end: "center 55%", scrub: true } },
        );
        gsap.from("[data-stay-line]", { yPercent: 110, stagger: 0.1, duration: 1.3, scrollTrigger: { trigger: "[data-stay-copy]", start: "top 80%" } });
        gsap.from("[data-stay-note]", { x: -20, autoAlpha: 0, stagger: 0.07, duration: 0.9, scrollTrigger: { trigger: "[data-stay-notes]", start: "top 85%" } });
      });

      // Pausa el video fuera de pantalla para ahorrar batería.
      const io = new IntersectionObserver(([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      });
      if (videoRef.current) io.observe(videoRef.current);
      return () => io.disconnect();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="estadia" className="relative bg-arena px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-16 md:grid-cols-12 md:gap-8">
        <div data-stay-copy className="md:col-span-5 lg:col-span-4">
          <p className="mb-6 text-sm text-tinta/70">Estadía</p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5.2rem)] leading-[1.02] font-bold tracking-[-0.03em]">
            {["Dormir con", "el mar", "de fondo"].map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.16em] -mb-[0.1em]">
                <span data-stay-line className="block">
                  {l}
                </span>
              </span>
            ))}
          </h2>
          <p className="mt-8 max-w-[38ch] leading-relaxed text-tinta/75">
            Habitaciones cálidas en madera, frescas por dentro y a una caminata corta del agua. Llegas, sueltas la maleta y bajas a la playa.
          </p>
          <ul data-stay-notes className="mt-8 flex flex-wrap gap-2">
            {notes.map((n) => (
              <li key={n} data-stay-note className="rounded-full border border-tinta/15 px-4 py-2 text-sm">
                {n}
              </li>
            ))}
          </ul>
          <CtaLink href={whatsappLink("Hola Where, quiero saber de las habitaciones en Playa Soledad.")} icon={<WhatsAppIcon />} variant="dark" className="mt-10">
            Preguntar disponibilidad
          </CtaLink>
        </div>

        <div className="relative md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <div data-stay-frame className="grain relative mx-auto aspect-[10/13] w-full max-w-[34rem] overflow-hidden bg-selva-2">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src="/media/stay-hotel.mp4"
              poster="/media/stay-hotel-poster.webp"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Recorrido por el muelle, el mar y las habitaciones"
            />
          </div>
          <p className="mx-auto mt-6 max-w-[34rem] text-right text-xs text-tinta/70">
            Video:{" "}
            <a href="https://www.tiktok.com/@hotelplayasoledad" target="_blank" rel="noopener noreferrer" className="underline">
              @hotelplayasoledad
            </a>
          </p>
          <div className="absolute -bottom-10 -left-2 w-[38%] max-w-[13rem] md:-left-6 lg:-left-16">
            <RevealImage src="/media/room.webp" alt="Habitación con camas dobles y paredes de madera" sizes="13rem" className="aspect-square rounded-sm shadow-2xl" parallax={8} from="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
