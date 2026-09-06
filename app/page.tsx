import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Disciplines from "@/components/Disciplines";
import HorizontalGallery from "@/components/HorizontalGallery";
import StickyStory from "@/components/StickyStory";
import ProductAssembly from "@/components/ProductAssembly";
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
        <HorizontalGallery />
        <StickyStory />
        <ProductAssembly />
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
