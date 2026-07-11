import { useEffect, useRef, useState } from "react";
import "./about.css";

const facts = [
  { label: "Based in", value: "India" },
  { label: "Degree", value: "B.Tech IT — Year IV" },
  { label: "Focus", value: "Fullstack + Design" },
];

const interests = ["React", "Node.js", "MongoDB", "Figma", "DSA", "System Design"];

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={ref}>
      <div className="section-inner">

        <div className={`section-label ${visible ? "fade-up" : ""}`}>
          <span className="label-line" />
          About Me
        </div>

        <div className="about-grid">
          <div className={`about-left ${visible ? "fade-up delay-1" : ""}`}>
            <h2 className="section-title">
              Turning ideas into<br />
              <span className="title-accent">real experiences</span>
            </h2>
            <p className="about-body">
              I'm Harjit — a Final-year IT student with a passion for building
              things that live on the web. I care deeply about the intersection
              of engineering and design: code that's clean, interfaces that
              feel intuitive, and products that solve real problems.
            </p>
            <p className="about-body">
              When I'm not coding, I'm learning about data structures,
              exploring UX research, or pushing pixels in Figma.
            </p>

            <div className="about-interests">
              {interests.map((tag) => (
                <span className="interest-tag" key={tag}>{tag}</span>
              ))}
            </div>

            <blockquote className="pull-quote">
              Code is design. Every function is a decision about the user.
            </blockquote>
          </div>

          <div className={`about-right ${visible ? "fade-up delay-2" : ""}`}>
            <div className="id-card-wrap">
              <div className="id-card">
                <div className="id-card-band" />

                <div className="id-avatar">HM</div>

                <div className="id-name">Harjit Mahendran</div>
                <div className="id-role">Full Stack Developer</div>

                <div className="id-divider" />

                <div className="id-facts">
                  {facts.map((f) => (
                    <div className="id-fact-row" key={f.label}>
                      <span className="id-fact-label">{f.label}</span>
                      <span className="id-fact-value">{f.value}</span>
                    </div>
                  ))}
                </div>

                <div className="id-status">
                  <span className="id-status-dot" />
                  Open to Work
                </div>

                <div className="id-barcode">
                  <div className="barcode-stripes" />
                  <span className="id-number">ID · HM—2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}