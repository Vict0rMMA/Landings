"use client";

import dynamic from "next/dynamic";

const SpacesCarousel = dynamic(() => import("@/components/SpacesCarousel"), {
  ssr: false,
  loading: () => <div className="aspect-[4/5] w-[78vw] rounded-sm bg-arena-2 sm:w-[46vw] lg:w-[27vw]" />,
});

export default function Spaces() {
  return (
    <section id="espacios" className="overflow-hidden bg-arena px-5 pt-24 pb-28 md:px-10 md:pt-40 md:pb-40">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="mb-6 text-sm text-tinta/70">Espacios</p>
            <h2 className="max-w-[14ch] font-display text-[clamp(2.6rem,5vw,5.2rem)] leading-[1.02] font-bold tracking-[-0.03em]">Todo lo que te espera allá</h2>
          </div>
          <p className="max-w-[34ch] leading-relaxed text-tinta/70">Desliza para recorrer la playa, el mirador, las habitaciones y la fogata.</p>
        </div>
        <SpacesCarousel />
      </div>
    </section>
  );
}
