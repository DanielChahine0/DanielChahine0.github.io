import { NavBar } from "../components/NavBar";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSections } from "../components/SkillsSections";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { CloudBackground } from "../components/CloudBackground";
import { PageTransition } from "../components/PageTransition";

export const Home = () => {
  return (
    <PageTransition className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Background Effects */}
        <StarBackground />
        <CloudBackground />
        
        {/* Navbar */}
        <NavBar />

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSections />
          <ProjectsSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />
    </PageTransition>
  );
}