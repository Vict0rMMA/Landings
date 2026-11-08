"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import CtaLink from "@/components/CtaLink";
import Logo from "@/components/Logo";
import { useSmoothScroll } from "@/components/SmoothScroll";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { destination, whatsappLink } from "@/data/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const title = destination.name.toUpperCase();

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { lock, unlock, scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        lock();
        gsap
          .timeline({ defaults: { ease: "expo.out" }, onComplete: unlock })
          .from("[data-curtain-logo]", { yPercent: 120, duration: 1 })
          .to("[data-curtain-logo]", { yPercent: -120, duration: 0.7, ease: "expo.in" }, "+=0.3")
          .to("[data-curtain]", { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.1")
          .from("[data-hero-video]", { scale: 1.3, duration: 2.4 }, "<0.1")
          .from("[data-band]", { scaleX: 0, duration: 1.4, ease: "expo.inOut" }, "-=1.9")
          .from("[data-char]", { yPercent: 130, rotate: 6, duration: 1.2, stagger: 0.035 }, "-=0.7")
          .from("[data-hero-fade]", { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, "-=0.9")
          .set("[data-curtain]", { display: "none" });

        gsap
          .timeline({ scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } })
          .to("[data-hero-media]", { yPercent: 22, ease: "none" }, 0)
          .to("[data-hero-video]", { scale: 1.12, ease: "none" }, 0)
          .to("[data-band]", { xPercent: -18, ease: "none" }, 0)
          .to("[data-hero-content]", { yPercent: -40, autoAlpha: 0, ease: "none" }, 0)
          .to("[data-hero-shade]", { opacity: 0.85, ease: "none" }, 0);
      });
      return () => unlock();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="inicio" aria-label={destination.name} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-tinta text-white">
      <div data-curtain className="fixed inset-0 z-[60] grid place-items-center bg-selva text-arena">
        <div className="overflow-hidden px-4 py-3">
          <div data-curtain-logo className="[&_span]:text-[2.2rem] [&_svg]:size-12">
            <Logo />
          </div>
        </div>
      </div>

      <div data-hero-media className="grain absolute inset-0 will-change-transform">
        <Image
          data-hero-video
          src="/media/espacios/agua-cristalina.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[50%_60%]"
        />
        <div data-hero-shade className="absolute inset-0 bg-gradient-to-b from-tinta/50 via-tinta/10 to-tinta/75 opacity-60" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-10">
        <div data-band className="mb-8 origin-left bg-white py-3 text-tinta shadow-[0_20px_60px_-30px_rgba(0,0,0,.6)] md:mb-12 md:py-5">
          <h1 className="flex justify-center overflow-hidden font-display text-[clamp(1.7rem,7.4vw,9rem)] leading-none font-medium tracking-[0.2em] whitespace-nowrap pl-[0.2em] md:tracking-[0.28em] md:pl-[0.28em]">
            {title.split("").map((ch, i) => (
              <span key={i} data-char className="inline-block will-change-transform">
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </h1>
        </div>

        <div data-hero-content className="mx-auto grid w-full max-w-[1600px] gap-6 px-5 md:grid-cols-[1fr_auto] md:items-end md:px-10">
          <div>
            <p data-hero-fade className="font-display text-3xl italic md:text-4xl">
              {destination.region}
            </p>
            <p data-hero-fade className="mt-3 max-w-[34ch] text-[0.98rem] leading-relaxed text-white/85 md:text-lg">
              Selva espesa, agua turquesa y una fogata frente al mar. Un plan de Where? para salir de la ciudad.
            </p>
          </div>
          <div data-hero-fade className="flex items-center gap-3">
            <CtaLink href={whatsappLink()} icon={<WhatsAppIcon />} variant="light">
              Reservar por WhatsApp
            </CtaLink>
            <button
              type="button"
              onClick={() => scrollTo("#lugar")}
              className="grid size-12 shrink-0 place-items-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-tinta"
            >
              <ArrowDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
              <span className="sr-only">Ver el lugar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
