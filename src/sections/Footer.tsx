import Logo from "@/components/Logo";
import { contact, destination, navItems, whatsappLink } from "@/data/site";

export default function Footer() {
  const marquee = `${contact.tagline}? `;
  return (
    <footer className="overflow-hidden bg-tinta text-arena">
      <div className="border-b border-arena/10 py-10 md:py-14" aria-hidden="true">
        <div className="animate-marquee flex w-max whitespace-nowrap font-display text-[clamp(3.5rem,11vw,11rem)] leading-none font-extrabold tracking-[-0.03em]">
          {Array.from({ length: 4 }, (_, i) => (
            <span key={i} className="px-[0.4em]">
              ¿{marquee}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
        <div className="md:col-span-5">
          <Logo className="text-arena" />
          <p className="mt-6 max-w-[38ch] leading-relaxed text-arena/70">
            Somos una plataforma digital que informa qué hay pa’ hacer hoy en la ciudad y conecta eventos y planes con la gente.
          </p>
        </div>

        <nav aria-label="Pie de página" className="md:col-span-3">
          <p className="text-sm text-arena/70">Secciones</p>
          <ul className="mt-4 space-y-2">
            {navItems.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className="transition-colors hover:text-sol">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-sm text-arena/70">Contacto</p>
          <ul className="mt-4 space-y-2">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-sol">
                WhatsApp {contact.phoneLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-sol">
                {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.web} target="_blank" rel="noopener noreferrer" className="hover:text-sol">
                {contact.webLabel}
              </a>
            </li>
            <li>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-sol">
                Facebook {contact.facebookLabel}
              </a>
            </li>
            <li className="text-arena/60">{contact.hours}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-4 border-t border-arena/10 px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-arena/70 md:px-10">
        <p>© {new Date().getFullYear()} Where? Medellín</p>
        <p>
          {destination.name}, {destination.region}
        </p>
      </div>
    </footer>
  );
}
