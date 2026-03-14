import { useEffect, useRef, useState } from "react";
import "./About.css";

const facts = [
  { label: "Based in", value: "India" },
  { label: "Degree", value: "B.Tech IT — Year 3" },
  { label: "Focus", value: "Fullstack + Design" },
  { label: "Status", value: "Open to Work", highlight: true },
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
              I'm Harjit — a third-year IT student with a passion for building
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
          </div>

          <div className={`about-right ${visible ? "fade-up delay-2" : ""}`}>
            <div className="about-card">
              {facts.map((f) => (
                <div className="fact-row" key={f.label}>
                  <span className="fact-label">{f.label}</span>
                  <span className={`fact-value ${f.highlight ? "highlight" : ""}`}>
                    {f.highlight && <span className="fact-dot" />}
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="about-quote-card">
              <p className="quote-text">
                "Code is design. Every function is a decision about the user."
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}