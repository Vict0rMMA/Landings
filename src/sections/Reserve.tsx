"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { useRef } from "react";
import CtaLink from "@/components/CtaLink";
import Logo from "@/components/Logo";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { contact, destination, whatsappLink } from "@/data/site";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const sealText = `${contact.tagline} · ${contact.tagline} · `;

export default function Reserve() {
  const root = useRef<HTMLElement>(null);
  const ticket = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ticket.current, { yPercent: 25, rotate: -9, autoAlpha: 0, duration: 1.6, scrollTrigger: { trigger: root.current, start: "top 60%" } });
        gsap.fromTo("[data-reserve-bg]", { scale: 1.2 }, { scale: 1, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } });
      });

      // Alinea las muescas del ticket con la línea perforada.
      const ro = new ResizeObserver(() => {
        const el = ticket.current;
        const cut = el?.querySelector<HTMLElement>("[data-perforation]");
        if (el && cut) el.style.setProperty("--notch-y", `${cut.offsetTop + cut.offsetHeight / 2}px`);
      });
      if (ticket.current) ro.observe(ticket.current);

      // Inclinación sutil siguiendo el puntero (solo dispositivos con hover).
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () => {
        const el = ticket.current!;
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 10);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
        };
        const reset = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", reset);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", reset);
        };
      });
      return () => ro.disconnect();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="reserva" className="relative overflow-hidden bg-selva px-5 py-24 md:px-10 md:py-36">
      <div data-reserve-bg className="absolute inset-0">
        <Image src="/media/village.webp" alt="" fill sizes="100vw" className="object-cover opacity-45 blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-selva/70 via-selva/30 to-selva/90" />
      </div>

      <div className="relative mx-auto max-w-[36rem] [perspective:1200px]">
        <div ref={ticket} className="ticket relative bg-sol px-7 pt-10 pb-9 text-tinta shadow-[0_40px_80px_-40px_rgba(0,0,0,.7)] [transform-style:preserve-3d] md:px-12 md:pt-14 md:pb-12">
          <div className="pointer-events-none absolute inset-3 rounded-[2px] border border-tinta/25" aria-hidden="true" />

          <div className="flex items-start justify-between gap-6">
            <div>
              <Logo />
              <p className="mt-2 text-sm">te invita a</p>
            </div>
            <svg viewBox="0 0 100 100" className="animate-spin-slow size-20 shrink-0 md:size-24" aria-hidden="true">
              <defs>
                <path id="seal" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text fontSize="9.2" letterSpacing="1.2" fill="currentColor" fontFamily="var(--font-sans)" fontWeight="600">
                <textPath href="#seal">{sealText}</textPath>
              </text>
              <circle cx="50" cy="50" r="17" fill="var(--color-azul)" />
              <text x="50" y="56" textAnchor="middle" fontSize="18" fontWeight="800" fill="#fff" fontFamily="var(--font-sans)">?</text>
            </svg>
          </div>

          <h2 className="mt-8 font-display text-[clamp(3rem,11vw,5.4rem)] leading-[0.9] font-medium">{destination.name}</h2>
          <p className="mt-3 font-display text-2xl italic">{destination.region}</p>

          <div data-perforation className="my-9 border-t-2 border-dashed border-tinta/35" aria-hidden="true" />

          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="text-tinta/70">Fechas y precio</dt>
              <dd className="mt-1 font-medium">Te los enviamos por WhatsApp</dd>
            </div>
            <div>
              <dt className="text-tinta/70">Atención</dt>
              <dd className="mt-1 font-medium">24 horas, todos los días</dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink href={whatsappLink()} icon={<WhatsAppIcon />} variant="dark">
              Reservar por WhatsApp
            </CtaLink>
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-medium underline-offset-4 hover:underline">
              <Mail className="size-4" aria-hidden="true" />
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
