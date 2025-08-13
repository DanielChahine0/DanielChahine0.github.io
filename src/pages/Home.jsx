import { NavBar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSections } from "../components/SkillsSection_Enhanced";
import { ProjectsSection } from "../components/ProjectsSection";
import { BlogsSection } from "../components/BlogsSection";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";

export const Home = () => {
  return (
    <PageTransition className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Navbar */}
        <NavBar />

        {/* Main Content with Enhanced Spacing */}
        <main className="space-y-0">
          {/* Hero takes full screen */}
          <HeroSection />
          
          {/* Other sections with consistent spacing */}
          <div className="space-y-24">
            <AboutSection />
            <SkillsSections />
            <ProjectsSection />
            <BlogsSection />
          </div>
        </main>

        {/* Footer */}
        <Footer />
    </PageTransition>
  );
}