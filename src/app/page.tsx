import Header from "../components/Header";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Courses from "../components/Courses";
import Contact from "../components/Contact";
import ThreeCanvas from "@/components/ThreeCanvas";
import Footer from "@/components/Footer";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  return (
    <div>
      <ThreeCanvas />
      <Header />
      <Skills />
      <Projects />
      <Courses />
      <Contact />
      <Footer />
    </div>
  );
}
