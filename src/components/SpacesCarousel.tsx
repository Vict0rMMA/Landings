"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { A11y, FreeMode, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { spaces } from "@/data/site";

export default function SpacesCarousel() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Swiper
        modules={[FreeMode, Keyboard, Mousewheel, Navigation, A11y]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={{ enabled: true, momentumRatio: 0.6 }}
        mousewheel={{ forceToAxis: true }}
        keyboard={{ enabled: true }}
        grabCursor
        navigation={{ prevEl: "[data-spaces-prev]", nextEl: "[data-spaces-next]" }}
        a11y={{ prevSlideMessage: "Anterior", nextSlideMessage: "Siguiente" }}
        breakpoints={{ 768: { spaceBetween: 24 } }}
        onSlideChange={(s) => setIndex(s.activeIndex)}
        className="!overflow-visible"
      >
        {spaces.map((s) => (
          <SwiperSlide key={s.title} className="!w-[78vw] sm:!w-[46vw] lg:!w-[27vw]">
            <article className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-selva-2">
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 27vw, (min-width: 640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-expo)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-tinta/80 to-transparent p-5 pt-16 opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white/90">{s.text}</p>
                </div>
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight md:text-3xl">{s.title}</h3>
              <p className="mt-1 text-sm text-tinta/70 lg:hidden">{s.text}</p>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-10 flex items-center justify-between gap-6">
        <p className="font-display text-lg font-semibold tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, "0")} <span className="text-tinta/70">/ {String(spaces.length).padStart(2, "0")}</span>
        </p>
        <div className="flex gap-2">
          {[
            { attr: { "data-spaces-prev": "" }, icon: ArrowLeft, label: "Espacio anterior" },
            { attr: { "data-spaces-next": "" }, icon: ArrowRight, label: "Espacio siguiente" },
          ].map(({ attr, icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              {...attr}
              aria-label={label}
              className="grid size-12 place-items-center rounded-full border border-tinta/20 transition-colors hover:border-tinta hover:bg-tinta hover:text-arena disabled:pointer-events-none disabled:opacity-30"
            >
              <Icon className="size-5" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
