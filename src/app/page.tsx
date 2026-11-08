import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Intro from "@/sections/Intro";
import Moments from "@/sections/Moments";
import Night from "@/sections/Night";
import Reserve from "@/sections/Reserve";
import Spaces from "@/sections/Spaces";
import Stay from "@/sections/Stay";

export default function Home() {
  return (
    <SmoothScroll>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Moments />
        <Stay />
        <Night />
        <Spaces />
        <Reserve />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </SmoothScroll>
  );
}
