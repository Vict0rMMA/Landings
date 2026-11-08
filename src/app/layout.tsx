import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/cormorant-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-500-italic.woff2", weight: "500", style: "italic" },
  ],
  variable: "--font-cormorant",
  preload: false,
  display: "swap",
});

const figtree = localFont({
  src: "../fonts/figtree.woff2",
  weight: "300 900",
  variable: "--font-figtree",
  display: "swap",
});

const title = "Playa Soledad, Chocó | Plan Where?";
const description =
  "Selva, mar turquesa, piscina y fogata en la playa. Reserva tu plan a Playa Soledad, Chocó, con Where? por WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.where.com.co"),
  title,
  description,
  keywords: ["Playa Soledad", "Chocó", "plan desde Medellín", "Where", "qué hay pa hacer hoy", "playas Colombia"],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "es_CO",
    siteName: "Where?",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Playa Soledad, Chocó, vista aérea" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#0f2a1f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${figtree.variable}`}>
      <body>
        <noscript>
          <style>{"[data-curtain]{display:none!important}"}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
