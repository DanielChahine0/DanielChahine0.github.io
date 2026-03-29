/**
 * Home.jsx
 * Main landing page with section dividers for visual rhythm
 */
import { NavBar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSections } from "../components/SkillsSection_Enhanced";
import { ProjectsSection } from "../components/ProjectsSection";
import { BlogsSection } from "../components/BlogsSection";
import { Footer } from "../components/Footer";
import { PageTransition } from "../components/PageTransition";

const SectionDivider = () => (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
        <div className="w-12 h-px" style={{ background: "var(--accent-color)", opacity: 0.25 }} />
        <div
            className="w-1.5 h-1.5 rounded-full mx-3"
            style={{ background: "var(--accent-color)", opacity: 0.3 }}
        />
        <div className="w-12 h-px" style={{ background: "var(--accent-color)", opacity: 0.25 }} />
    </div>
);

export const Home = () => {
    return (
        <PageTransition className="min-h-screen bg-background text-foreground">
            <NavBar />

            <main>
                <HeroSection />
                <SectionDivider />
                <ProjectsSection />
                <SectionDivider />
                <AboutSection />
                <SectionDivider />
                <SkillsSections />
                <SectionDivider />
                <BlogsSection />
            </main>

            <Footer />
        </PageTransition>
    );
}
