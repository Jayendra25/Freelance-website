import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Introduction } from "@/components/sections/Introduction";
import { Maintenance } from "@/components/sections/Maintenance";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Services } from "@/components/sections/Services";

export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Introduction />
      <Services />
      <Industries />
      <SelectedWork />
      <Process />
      <Pricing />
      <Maintenance />
      <About />
      <Faq />
      <Contact />
    </main>
  );
}
