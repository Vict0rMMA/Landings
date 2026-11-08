"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contact, destination, navItems, whatsappLink } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";

type Props = { open: boolean; onClose: () => void };

export default function MenuOverlay({ open, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
        .set(root.current, { visibility: "visible" })
        .fromTo(root.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 })
        .from("[data-menu-link]", { yPercent: 110, duration: 1, stagger: 0.06, ease: "expo.out" }, 0.45)
        .from("[data-menu-media]", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.1 }, 0.35)
        .from("[data-menu-meta]", { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.06, ease: "expo.out" }, 0.7);
    },
    { scope: root },
  );

  const mounted = useRef(false);
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (open) {
      lock();
      t.timeScale(1).play();
      root.current?.querySelector<HTMLAnchorElement>("[data-menu-link]")?.focus({ preventScroll: true });
    } else {
      t.timeScale(1.6).reverse();
      unlock();
    }
  }, [open, lock, unlock]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const go = (id: string) => {
    onClose();
    // Espera a que el overlay libere el scroll antes de navegar.
    gsap.delayedCall(0.35, () => scrollTo(`#${id}`));
  };

  return (
    <div
      ref={root}
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      inert={!open}
      className="invisible fixed inset-0 z-40 bg-selva text-arena"
    >
      <div className="mx-auto grid h-full max-w-[1600px] grid-cols-1 gap-10 px-5 pt-28 pb-8 md:px-10 lg:grid-cols-[1.2fr_1fr] lg:pt-32">
        <nav aria-label="Secciones" className="flex flex-col justify-center">
          <ul className="space-y-1 md:space-y-0">
            {navItems.map((item, i) => (
              <li key={item.id} className="overflow-hidden">
                <a
                  data-menu-link
                  href={`#${item.id}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.id);
                  }}
                  className="group flex items-baseline gap-4 font-display text-[clamp(2.6rem,7.5vw,6.2rem)] leading-[1.02] font-bold tracking-[-0.03em] transition-colors hover:text-sol focus-visible:text-sol"
                >
                  <span className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden flex-col justify-center lg:flex">
          <div data-menu-media className="relative aspect-[4/5] w-full max-w-[30rem] justify-self-end overflow-hidden rounded-sm">
            {navItems.map((item, i) => (
              <Image
                key={item.id}
                src={item.image}
                alt=""
                fill
                sizes="30rem"
                className={`object-cover transition-all duration-700 ease-[var(--ease-expo)] ${active === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-arena/15 pt-6 text-sm text-arena/70 lg:col-span-2">
          <p data-menu-meta>
            {destination.name}, {destination.region}
          </p>
          <div data-menu-meta className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-sol">
              WhatsApp {contact.phoneLabel}
            </a>
            <a href={`mailto:${contact.email}`} className="hover:text-sol">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
