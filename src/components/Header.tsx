"use client";

import { useRef, useState } from "react";
import { whatsappLink } from "@/data/site";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import Logo from "./Logo";
import MenuOverlay from "./MenuOverlay";
import { useSmoothScroll } from "./SmoothScroll";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useGSAP(() => {
    const el = ref.current!;
    // Sólido al salir del hero; se oculta al bajar y reaparece al subir.
    ScrollTrigger.create({
      start: () => window.innerHeight * 0.85,
      end: "max",
      onToggle: ({ isActive }) => el.toggleAttribute("data-solid", isActive),
      onUpdate: ({ direction, progress }) => {
        if (el.hasAttribute("data-menu-open")) return;
        gsap.to(el, { yPercent: direction === 1 && progress > 0 ? -110 : 0, duration: 0.6, ease: "expo.out", overwrite: true });
      },
    });
  });

  return (
    <>
      <header
        ref={ref}
        data-menu-open={open || undefined}
        className="group fixed inset-x-0 top-0 z-50 text-white transition-colors duration-500 data-[solid]:text-tinta"
      >
        <div className="absolute inset-0 -z-10 bg-arena/85 opacity-0 backdrop-blur-md transition-opacity duration-500 group-data-[solid]:opacity-100 group-data-[menu-open]:opacity-0" />
        <div className="mx-auto flex h-[4.5rem] max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10">
          <a
            href="#inicio"
            aria-label="Where?, ir al inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollTo(0);
            }}
            className="group-data-[menu-open]:text-arena"
          >
            <Logo />
          </a>
          <div className="flex items-center gap-2 md:gap-4">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-current/30 px-5 py-2.5 text-sm font-medium transition-colors hover:border-current hover:bg-current/10 sm:inline-flex group-data-[menu-open]:text-arena"
            >
              Reservar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-principal"
              className="relative grid size-12 place-items-center rounded-full group-data-[menu-open]:text-arena"
            >
              <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
              <span aria-hidden="true" className="relative block h-3 w-7">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ease-[var(--ease-expo)] ${open ? "top-1/2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px bg-current transition-all duration-500 ease-[var(--ease-expo)] ${open ? "top-1/2 w-full -rotate-45" : "top-full w-2/3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
