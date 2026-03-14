import { useEffect, useRef, useState } from "react";
import "./Skills.css";

const skills = [
  { name: "React.js",     pct: 85, cat: "Frontend" },
  { name: "HTML & CSS",   pct: 90, cat: "Frontend" },
  { name: "UI/UX Design", pct: 80, cat: "Frontend" },
  { name: "Node.js",      pct: 75, cat: "Backend"  },
  { name: "MongoDB",      pct: 70, cat: "Backend"  },
  { name: "Java",         pct: 65, cat: "Backend"  },
  { name: "Git & GitHub", pct: 80, cat: "Tooling"  },
  { name: "Figma",        pct: 75, cat: "Tooling"  },
];

const cats = ["All", "Frontend", "Backend", "Tooling"];

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("All");
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered = active === "All" ? skills : skills.filter(s => s.cat === active);

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="section-inner">

        <div className={`section-label ${visible ? "fade-up" : ""}`}>
          <span className="label-line" />
          Skills
        </div>

        <h2 className={`section-title ${visible ? "fade-up delay-1" : ""}`}>
          My <span className="title-accent">toolkit</span>
        </h2>

        <div className={`skills-filter ${visible ? "fade-up delay-2" : ""}`}>
          {cats.map(c => (
            <button
              key={c}
              className={`filter-btn ${active === c ? "active" : ""}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filtered.map((s, i) => (
            <div
              key={s.name}
              className={`skill-card ${visible ? "fade-up" : ""}`}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <div className="skill-top">
                <span className="skill-name">{s.name}</span>
                <span className="skill-pct">{s.pct}%</span>
              </div>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{ width: visible ? `${s.pct}%` : "0%" }}
                />
              </div>
              <span className="skill-cat">{s.cat}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}