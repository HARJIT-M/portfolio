import { useState, useEffect } from "react";
import "./Hero.css";

const roles = ["Full Stack Developer", "UI/UX Designer", "IT Student"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex + 1)); setCharIndex(c => c + 1); }, 70);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => { setDisplayed(current.slice(0, charIndex - 1)); setCharIndex(c => c - 1); }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex(r => (r + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex]);

  return (
    <section className="hero" id="home">
      <div className="hero-inner">

        <div className="hero-badge">
          <span className="badge-dot" />
          Available for opportunities
        </div>

        <h1 className="hero-name">
          Hi, I'm <span className="name-accent">Harjit Mahendran</span>
        </h1>

        <div className="hero-role-line">
          <span className="role-static">I build as a </span>
          <span className="role-typed">{displayed}<span className="typed-cursor">|</span></span>
        </div>

        <p className="hero-desc">
          Third-year IT student crafting modern web applications with React,
          Node.js, and MongoDB. Passionate about clean code and interfaces
          that feel effortless.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn-primary">View Projects <span>→</span></a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-num">10+</span>
            <span className="stat-lbl">Projects</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="stat-num">3+</span>
            <span className="stat-lbl">Years Coding</span>
          </div>
          <div className="hero-stat-div" />
          <div className="hero-stat">
            <span className="stat-num">100%</span>
            <span className="stat-lbl">Committed</span>
          </div>
        </div>

      </div>

      <div className="hero-grid-bg" />
    </section>
  );
}