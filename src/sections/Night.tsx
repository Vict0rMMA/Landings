"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export default function Night() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        // Del día a la noche: la fogata se abre en círculo sobre la playa.
        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "+=160%", pin: true, scrub: 1 } })
          .fromTo("[data-night]", { clipPath: "circle(0% at 50% 62%)" }, { clipPath: "circle(80% at 50% 62%)", ease: "power2.inOut", duration: 1 }, 0)
          .fromTo("[data-night] img", { scale: 1.35 }, { scale: 1, ease: "none", duration: 1 }, 0)
          .to("[data-day] img", { scale: 1.15, ease: "none", duration: 1 }, 0)
          .to("[data-label-day]", { yPercent: -100, autoAlpha: 0, ease: "power2.in", duration: 0.3 }, 0.1)
          .fromTo("[data-label-night]", { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, ease: "power2.out", duration: 0.3 }, 0.5);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="noche" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-tinta text-white">
      <div data-day className="absolute inset-0">
        <Image src="/media/palms.webp" alt="Playa con palmeras de día" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-tinta/60 to-transparent" />
      </div>
      <div data-night className="absolute inset-0 [clip-path:circle(80%_at_50%_62%)] motion-safe:[clip-path:circle(0%_at_50%_62%)]">
        <Image src="/media/bonfire.webp" alt="Fogata encendida en la playa bajo luces colgantes" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-tinta/80 via-transparent to-tinta/30" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-14 md:px-10 md:pb-20">
        <div className="relative h-[clamp(3.6rem,10vw,10rem)] overflow-hidden">
          <h2 data-label-day className="absolute inset-0 font-display text-[clamp(3.2rem,10vw,10rem)] leading-none font-extrabold tracking-[-0.03em] motion-reduce:hidden">
            De día, mar.
          </h2>
          <h2 data-label-night className="absolute inset-0 font-display text-[clamp(3.2rem,10vw,10rem)] leading-none font-extrabold tracking-[-0.03em]">
            De noche, fogata.
          </h2>
        </div>
        <p className="mt-6 max-w-[40ch] leading-relaxed text-white/80">
          Cuando cae el sol se prenden las luces sobre la arena y la fogata reúne a todo el grupo frente al mar.
        </p>
      </div>
    </section>
  );
}
