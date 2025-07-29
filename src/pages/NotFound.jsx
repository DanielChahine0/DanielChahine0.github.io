
import { PageTransition } from "../components/PageTransition";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const NotFound = () => {
  return (
    <>
      <NavBar />
      <PageTransition>
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
          <p style={{ fontSize: "1.5rem", color: "#888" }}>Sorry, the page you are looking for was not found.</p>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
}