"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Desplazamiento parallax interno en %, 0 desactiva. */
  parallax?: number;
  from?: "bottom" | "left" | "right";
};

const clipFrom = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export default function RevealImage({ src, alt, className = "", sizes = "100vw", priority, parallax = 10, from = "bottom" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const img = root.current!.querySelector("img");
        gsap.fromTo(
          root.current,
          { clipPath: clipFrom[from] },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", scrollTrigger: { trigger: root.current, start: "top 85%" } },
        );
        gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%" } });
        if (parallax) {
          gsap.fromTo(
            img,
            { yPercent: -parallax },
            { yPercent: parallax, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-hidden bg-selva-2 ${className}`}>
      <div
        className="absolute inset-x-0"
        style={parallax ? { top: `-${parallax}%`, height: `${100 + parallax * 2}%` } : { top: 0, height: "100%" }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover will-change-transform" />
      </div>
    </div>
  );
}
