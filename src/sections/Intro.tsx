"use client";

import { useRef } from "react";
import RevealImage from "@/components/RevealImage";
import { destination, pillars } from "@/data/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const statement =
  "Donde la selva baja hasta la orilla y el agua es tan clara que el arrecife se ve desde la arena.";

export default function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Las palabras se encienden al ritmo del scroll.
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: "[data-statement]", start: "top 80%", end: "bottom 45%", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>("[data-pillar]").forEach((el) => {
          gsap.from(el.children, { y: 40, autoAlpha: 0, stagger: 0.08, scrollTrigger: { trigger: el, start: "top 85%" } });
          gsap.from(el.querySelector("[data-rule]"), { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 85%" } });
        });
        gsap.from("[data-quote-word]", { yPercent: 110, stagger: 0.12, duration: 1.3, scrollTrigger: { trigger: "[data-quote]", start: "top 80%" } });
        gsap.to("[data-float]", { yPercent: -35, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="lugar" className="relative bg-arena px-5 pt-28 pb-24 md:px-10 md:pt-44 md:pb-40">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-8 text-sm text-tinta/70 md:mb-12">El lugar</p>
        <h2 data-statement className="max-w-[22ch] font-display text-[clamp(2.1rem,5.4vw,5.6rem)] leading-[1.08] font-bold tracking-[-0.03em] text-tinta">
          {statement.split(" ").map((w, i) => (
            <span key={i} data-word className="inline-block whitespace-pre">
              {w}{" "}
            </span>
          ))}
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-14 md:mt-32 md:grid-cols-12 md:gap-8">
          <div className="relative md:col-span-6 lg:col-span-5">
            <RevealImage
              src="/media/clear-water.webp"
              alt="Agua turquesa y transparente frente a la playa, con palmeras y selva detrás"
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[3/4] rounded-sm"
              parallax={8}
            />
            <div data-float className="absolute -right-4 -bottom-16 hidden w-[46%] md:block lg:-right-24">
              <RevealImage src="/media/swings.webp" alt="" sizes="20vw" className="aspect-[4/5] rounded-sm shadow-2xl" parallax={6} from="left" />
            </div>
          </div>

          <div className="flex flex-col justify-end gap-12 md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            {pillars.map((p) => (
              <div key={p.title} data-pillar>
                <div data-rule className="mb-5 h-px bg-tinta/20" />
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-tinta/75">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        <blockquote data-quote className="mt-32 text-center font-display text-[clamp(2.6rem,8vw,8rem)] leading-none font-extrabold tracking-[-0.03em] md:mt-48">
          {destination.quote.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.2em] align-top">
              <span data-quote-word className="inline-block">{w}&nbsp;</span>
            </span>
          ))}
        </blockquote>
      </div>
    </section>
  );
}
