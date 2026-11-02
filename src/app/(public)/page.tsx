import { Hero } from "@/components/public/sections/Hero";
import { About } from "@/components/public/sections/About";
import { Skills } from "@/components/public/sections/Skills";
import { ProjectsPreview } from "@/components/public/sections/ProjectsPreview";
import { Labs } from "@/components/public/sections/Labs";
import { Timeline } from "@/components/public/sections/Timeline";
import { Certifications } from "@/components/public/sections/Certifications";
import { Contact } from "@/components/public/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <ProjectsPreview />
      <Labs />
      <Timeline />
      <Certifications />
      <Contact />
    </>
  );
}
