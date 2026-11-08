"use client";

import { useRef } from "react";
import { whatsappLink } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingWhatsApp() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    gsap.set(ref.current, { autoAlpha: 0, scale: 0.6 });
    ScrollTrigger.create({
      trigger: "#lugar",
      start: "top 60%",
      endTrigger: "#reserva",
      end: "top 70%",
      onToggle: ({ isActive }) =>
        gsap.to(ref.current, { autoAlpha: isActive ? 1 : 0, scale: isActive ? 1 : 0.6, duration: 0.6, ease: "back.out(2)" }),
    });
  });

  return (
    <a
      ref={ref}
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Where por WhatsApp"
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-8px_rgba(10,22,17,.55)] transition-transform hover:scale-110 md:right-8 md:bottom-8"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
