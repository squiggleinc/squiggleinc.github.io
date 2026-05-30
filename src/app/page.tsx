import WarpBackground from "@/components/effects/WarpBackground";
import { DeepDiveProvider } from "@/components/deepdive/DeepDiveContext";
import ProjectDeepDive from "@/components/deepdive/ProjectDeepDive";
import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Stats from "@/components/sections/Stats";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <DeepDiveProvider>
      <WarpBackground />
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Stats />
        <Timeline />
        <Contact />
      </main>
      <Footer />
      <ProjectDeepDive />
    </DeepDiveProvider>
  );
}
