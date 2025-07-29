import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";

export default function Playground() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <NavBar />
            <main className="flex-1 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Playground</h1>
                <p className="text-lg text-foreground/80">Welcome to the Playground! Here you'll find different games and interactive experiences soon.</p>
            </main>
            <Footer />
        </div>
    );
}
