import { useEffect, useRef, useState } from "react";
import "./projects.css";

const projects = [
  {
    title: "Lab Slot Booking System",
    desc: "Full stack web application where students can book lab slots and teachers can manage schedules with real-time conflict detection.",
    stack: ["React", "Node.js", "MongoDB"],
    tag: "Full Stack",
    status: "Live",
    github: "https://github.com/MohithIT203/Laboratory-Management",
    demo: "https://laboratory-management-mauve.vercel.app/",
  },
  {
    title: "Internship Evaluation System",
    desc: "A platform where team leaders assign projects, track intern progress, and evaluate performance with structured scoring.",
    stack: ["React", "Express", "MongoDB"],
    tag: "Full stack",
    status: "Live",
    github: "https://github.com/HARJIT-M/internship_evaluation_system",
    demo: "https://internshipevaluationsystem.vercel.app/",
  },
  {
  title: "3Games",
  desc: "A fun browser-based platform where users can play three classic games: Rock-Paper-Scissors, Guess the Number, and Tic-Tac-Toe. Built with interactive UI and simple game logic for an engaging experience.",
  stack: ["HTML", "CSS", "JavaScript"],
  tag: "Game",
  status: "Complete",
  github: "https://github.com/HARJIT-M/3games",
  demo: null,
},
];

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const [popup, setPopup] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setPopup(null);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="projects" id="projects" ref={ref}>
      <div className="section-inner">

        <div className={`section-label ${visible ? "fade-up" : ""}`}>
          <span className="label-line" />
          Projects
        </div>

        <div className="projects-head">
          <h2 className={`section-title ${visible ? "fade-up delay-1" : ""}`}>
            Things I've <span className="title-accent">built</span>
          </h2>

          <a
            href="https://github.com/HARJIT-M"
            target="_blank"
            rel="noreferrer"
            className={`projects-all ${visible ? "fade-up delay-1" : ""}`}
          >
            All projects ↗
          </a>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`project-card ${visible ? "fade-up" : ""}`}
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              <div className="pc-top">
                <div className="pc-tags">
                  <span className="pc-tag">{p.tag}</span>

                  <span className={`pc-status ${p.status === "Live" ? "live" : ""}`}>
                    {p.status === "Live" && <span className="status-dot" />}
                    {p.status}
                  </span>
                </div>

                <button
                  className="pc-link"
                  onClick={() => setPopup(p)}
                  title="Open project"
                >
                  ↗
                </button>
              </div>

              <h3 className="pc-title">{p.title}</h3>
              <p className="pc-desc">{p.desc}</p>

              <div className="pc-stack">
                {p.stack.map((s) => (
                  <span className="pc-chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>

              <button
                className="pc-open-btn"
                onClick={() => setPopup(p)}
              >
                View Project <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Popup */}
      {popup && (
        <>
          <div
            className="popup-backdrop"
            onClick={() => setPopup(null)}
          />

          <div className="popup">
            <button
              className="popup-close"
              onClick={() => setPopup(null)}
            >
              ✕
            </button>

            <div className="popup-tag-row">
              <span className="pc-tag">{popup.tag}</span>

              <span className={`pc-status ${popup.status === "Live" ? "live" : ""}`}>
                {popup.status === "Live" && <span className="status-dot" />}
                {popup.status}
              </span>
            </div>

            <h3 className="popup-title">{popup.title}</h3>
            <p className="popup-desc">{popup.desc}</p>

            <div className="popup-stack">
              {popup.stack.map((s) => (
                <span className="pc-chip" key={s}>
                  {s}
                </span>
              ))}
            </div>

            <div className="popup-actions">

              {/* GitHub Button */}
              <a
                href={popup.github}
                target="_blank"
                rel="noreferrer"
                className="popup-btn github"
              >
                View on GitHub
              </a>

              {/* Demo Button */}
              {popup.demo ? (
                <a
                  href={popup.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="popup-btn demo"
                >
                  Live Demo
                </a>
              ) : (
                <span className="popup-btn disabled">
                  No Live Demo
                </span>
              )}

            </div>
          </div>
        </>
      )}
    </section>
  );
}