import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Disciplines from "@/components/Disciplines";
import About from "@/components/About";
import Experience from "@/components/Experience";
import WhyMe from "@/components/WhyMe";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParallaxBackground from "@/components/ParallaxBackground";

export default function Home() {
  return (
    <>
      <ParallaxBackground />
      <Nav />
      <main>
        <Hero />
        <ProjectGrid />
        <Disciplines />
        <About />
        <WhyMe />
        <Experience />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
