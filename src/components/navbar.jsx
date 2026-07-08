import { useState, useEffect } from "react";
import "./navbar.css";
// import ThemeSwitcher from './themeswitcher.css';
const links = ["Home", "About", "Projects", "Skills", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#home" className="navbar-logo">
          <span className="logo-dot" />
          <span className="logo-text">Harjit</span>
        </a>

        <ul className="navbar-links">
          {links.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className={`nav-link ${active === link ? "active" : ""}`}
                onClick={() => setActive(link)}
              >
                {link}
                <span className="nav-link-underline" />
              </a>
            </li>
          ))}
        </ul>

        {/* <a href="/resume.pdf" download="HARJIT-MAHENDRAN-RESUME.pdf" className="navbar-cta">
          Resume <span className="cta-arrow">↗</span>
        </a> */}
        <a href="https://drive.google.com/file/d/19wIUex3HtzBJNurjPY6q0DtVgP2vtNBS/view"
     target="_blank"
     rel="noopener noreferrer"
     className="navbar-cta"
   >
         Resume <span className="cta-arrow">↗</span>
   </a>
      </div>
    </nav>
  );
}