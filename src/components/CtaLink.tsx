import type { ReactNode } from "react";

type Variant = "light" | "dark" | "sol";

const styles: Record<Variant, { base: string; fill: string }> = {
  light: { base: "bg-white/95 text-tinta", fill: "bg-sol" },
  dark: { base: "bg-tinta text-arena", fill: "bg-azul" },
  sol: { base: "bg-sol text-tinta", fill: "bg-white" },
};

type Props = {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

/** Botón con relleno que sube y texto que rueda al hover. */
export default function CtaLink({ href, children, icon, variant = "light", className = "", external = true }: Props) {
  const s = styles[variant];
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-transform duration-150 active:scale-[0.97] ${s.base} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 translate-y-full rounded-[inherit] transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 ${s.fill}`}
      />
      {icon && <span className="relative transition-transform duration-500 ease-[var(--ease-expo)] group-hover:rotate-[-12deg]">{icon}</span>}
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </a>
  );
}
