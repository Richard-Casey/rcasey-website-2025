import Hero from "../components/Hero";
import ProjectsSection from "../components/ProjectsSection";
import AboutMeSection from "../components/AboutMeSection";
import FooterSection from "../components/FooterSection";
import Divider from "../components/Divider";

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <ProjectsSection />
      <Divider />
      <AboutMeSection />
      <FooterSection />
    </>
  );
}
