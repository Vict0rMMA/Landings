"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "expo.out", duration: 1.2 });
  // En celular la barra del navegador cambia el alto al hacer scroll; sin esto
  // ScrollTrigger recalcula todo en cada cambio y la página da saltos.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_MOTION = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

export { gsap, ScrollTrigger, useGSAP };
