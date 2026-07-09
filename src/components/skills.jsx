import { useEffect, useRef, useState } from "react";
import {
  SiReact, SiHtml5, SiFigma, SiNodedotjs,
  SiMongodb, SiGit,
} from "react-icons/si";
import { FaPaintBrush, FaJava } from "react-icons/fa";
import "./skills.css";

const skills = [
  { name: "React.js",     icon: SiReact,      cat: "Frontend" },
  { name: "HTML & CSS",   icon: SiHtml5,      cat: "Frontend" },
  { name: "UI/UX Design", icon: FaPaintBrush, cat: "Frontend" },
  { name: "Node.js",      icon: SiNodedotjs,  cat: "Backend"  },
  { name: "MongoDB",      icon: SiMongodb,    cat: "Backend"  },
  { name: "Java",         icon: FaJava,       cat: "Backend"  },
  { name: "Git & GitHub", icon: SiGit,        cat: "Tooling"  },
  { name: "Figma",        icon: SiFigma,      cat: "Tooling"  },
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
          {filtered.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.name}
                className={`skill-card ${visible ? "fade-up" : ""}`}
                style={{ animationDelay: `${0.1 + i * 0.07}s` }}
              >
                <div className="skill-icon">
                  <Icon />
                </div>
                <span className="skill-name">{s.name}</span>
                <span className="skill-cat">{s.cat}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}