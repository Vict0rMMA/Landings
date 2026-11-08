"use client";

import Image from "next/image";
import { useRef } from "react";
import { moments } from "@/data/site";
import { DESKTOP_MOTION, gsap, useGSAP } from "@/lib/gsap";

export default function Moments() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Escritorio: scroll horizontal fijado con parallax interno por tarjeta.
      mm.add(DESKTOP_MOTION, () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const scroller = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        gsap.to("[data-progress]", { scaleX: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        gsap.utils.toArray<HTMLElement>("[data-moment]").forEach((card) => {
          gsap.fromTo(
            card.querySelector("img"),
            { xPercent: -12 },
            { xPercent: 12, ease: "none", scrollTrigger: { trigger: card, containerAnimation: scroller, start: "left right", end: "right left", scrub: true } },
          );
          gsap.from(card.querySelector("[data-moment-text]"), {
            y: 30,
            autoAlpha: 0,
            duration: 1,
            scrollTrigger: { trigger: card, containerAnimation: scroller, start: "left 75%" },
          });
        });
      });

      // Móvil/tablet: cada tarjeta se revela al entrar.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-moment]").forEach((card) => {
          gsap.fromTo(card.querySelector("[data-moment-media]"), { clipPath: "inset(12% 12% 12% 12%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: card, start: "top 90%", end: "top 40%", scrub: true } });
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="momentos" className="relative overflow-hidden bg-selva text-arena lg:h-[100svh]">
      <div ref={track} className="flex flex-col gap-16 px-5 py-24 md:px-10 lg:h-full lg:w-max lg:flex-row lg:items-stretch lg:gap-[6vw] lg:py-[12vh] lg:pr-[10vw]">
        <div className="flex shrink-0 flex-col justify-between lg:w-[34vw]">
          <p className="text-sm text-arena/60">Momentos</p>
          <div>
            <h2 className="mt-6 font-display text-[clamp(2.8rem,4.4vw,5rem)] leading-[1] font-normal">
              Un día entero
              <br />
              sin mirar el reloj
            </h2>
            <p className="mt-6 max-w-[36ch] leading-relaxed text-arena/70">
              Del primer chapuzón a la última foto en los columpios. Así se ve un día en Playa Soledad.
            </p>
          </div>
          <div className="mt-10 hidden h-px w-full bg-arena/15 lg:block">
            <div data-progress className="h-full origin-left scale-x-0 bg-sol" />
          </div>
        </div>

        {moments.map((m) => (
          <figure key={m.src} data-moment className={`flex shrink-0 flex-col gap-4 ${m.width} ${m.align}`}>
            <div data-moment-media className={`relative overflow-hidden rounded-sm bg-selva-2 ${m.ratio} lg:max-h-[62svh]`}>
              <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover lg:scale-[1.25]" />
            </div>
            <figcaption data-moment-text className="flex items-baseline justify-between gap-6">
              <span className="font-display text-2xl md:text-3xl">{m.title}</span>
              <span className="max-w-[24ch] text-right text-sm text-arena/65">{m.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
