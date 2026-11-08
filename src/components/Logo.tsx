/** Wordmark Where? con burbuja de diálogo, en línea con la identidad de la marca. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 40 40" className="size-8 shrink-0" aria-hidden="true">
        <path d="M20 3C10 3 3 9.3 3 17.2c0 4.6 2.4 8.6 6.2 11.2L8 37l8.4-5.2c1.2.2 2.4.3 3.6.3 10 0 17-6.3 17-14.2S30 3 20 3Z" fill="var(--color-azul)" />
        <text x="20" y="22.5" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff" fontFamily="var(--font-sans)">?</text>
      </svg>
      <span className="font-sans text-[1.35rem] leading-none font-extrabold tracking-[-0.03em]">Where?</span>
    </span>
  );
}
