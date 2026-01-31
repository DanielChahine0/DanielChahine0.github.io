/**
 * Home.jsx
 * Main landing page with clean, minimal layout
 */
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
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main>
                <HeroSection />
                <ProjectsSection />
                <AboutSection />
                <SkillsSections />
                <BlogsSection />
            </main>

            <Footer />
        </PageTransition>
    );
}
