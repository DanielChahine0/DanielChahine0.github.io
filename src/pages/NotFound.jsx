import { PageTransition } from "../components/PageTransition";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const NotFound = () => {
  return (
    <>
      <NavBar />
      <PageTransition>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
          <p style={{ fontSize: "1.5rem", color: "#888", maxWidth: 480, marginBottom: 24 }}>
            I probably introduced a bug here and didn't notice.
            If you discovered this by accident, feel free to let 
            me know or open an issue on the repository!
          </p>
          <a
            href="https://github.com/DanielChahine0/DanielChahine0.github.io"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              padding: "0.5rem 1.25rem",
              background: "#18181b",
              color: "#fff",
              borderRadius: 8,
              fontWeight: 500,
              textDecoration: "none",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)",
              transition: "background 0.2s"
            }}
            onMouseOver={e => (e.currentTarget.style.background = '#27272a')}
            onMouseOut={e => (e.currentTarget.style.background = '#18181b')}
            aria-label="Open GitHub repository for feedback or issues"
          >
            View GitHub Repo
          </a>
        </div>
      </PageTransition>
      <Footer />
    </>
  );
};
