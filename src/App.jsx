import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Hero from './components/hero';
import About from './components/about';
import Projects from './components/projects';
import Skills from './components/skills';
import Contact from './components/contact';

const themes = [
  { label: "Purple",  accent: "#6c63ff", bg: "#0c0c0f", bgCard: "#111116", bgHover: "#18181f", accent2: "#a78bfa" },
  { label: "Emerald", accent: "#10b981", bg: "#0a0f0c", bgCard: "#0f1512", bgHover: "#141f1a", accent2: "#34d399" },
  { label: "Rose",    accent: "#f43f5e", bg: "#0f0a0c", bgCard: "#160d10", bgHover: "#1c1015", accent2: "#fb7185" },
  { label: "Amber",   accent: "#f59e0b", bg: "#0f0d09", bgCard: "#161309", bgHover: "#1c180c", accent2: "#fcd34d" },
  { label: "Cyan",    accent: "#06b6d4", bg: "#090e0f", bgCard: "#0d1315", bgHover: "#111a1c", accent2: "#67e8f9" },
  { label: "Slate",   accent: "#94a3b8", bg: "#0c0d10", bgCard: "#111318", bgHover: "#16181f", accent2: "#cbd5e1" },
];

// Interpolate between two hex colors at position t (0–1)
function lerpHex(a, b, t) {
  const parse = (h) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `#${[r, g, bl].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}

function applyTheme(t) {
  const r = document.documentElement;
  r.style.setProperty("--accent",    t.accent);
  r.style.setProperty("--accent-2",  t.accent2);
  r.style.setProperty("--bg",        t.bg);
  r.style.setProperty("--bg-card",   t.bgCard);
  r.style.setProperty("--bg-hover",  t.bgHover);
}

function applyInterpolated(from, to, t) {
  applyTheme({
    accent:  lerpHex(from.accent,  to.accent,  t),
    accent2: lerpHex(from.accent2, to.accent2, t),
    bg:      lerpHex(from.bg,      to.bg,      t),
    bgCard:  lerpHex(from.bgCard,  to.bgCard,  t),
    bgHover: lerpHex(from.bgHover, to.bgHover, t),
  });
}

export default function App() {
  const [activeTheme, setActiveTheme] = useState(0);
  const [auto, setAuto] = useState(true);

  // Auto-cycle every 10s with smooth fade
  useEffect(() => {
    if (!auto) return;

    let frame;
    let start = null;
    const DURATION = 1500; // fade duration in ms
    const HOLD     = 10000; // hold time in ms

    let currentIndex = activeTheme;
    let nextIndex    = (activeTheme + 1) % themes.length;
    let phase        = "holding"; // "holding" | "fading"
    let holdStart    = performance.now();

    const tick = (now) => {
      if (phase === "holding") {
        if (now - holdStart >= HOLD) {
          phase = "fading";
          start = now;
        }
      } else {
        const t = Math.min((now - start) / DURATION, 1);
        // ease in-out cubic
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        applyInterpolated(themes[currentIndex], themes[nextIndex], eased);

        if (t >= 1) {
          currentIndex = nextIndex;
          nextIndex    = (nextIndex + 1) % themes.length;
          phase        = "holding";
          holdStart    = now;
          setActiveTheme(currentIndex);
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [auto, activeTheme]);

  const handleManual = (i) => {
    setActiveTheme(i);
    setAuto(false);
    applyTheme(themes[i]);
  };

  const toggleAuto = () => {
    if (!auto) setAuto(true);
    else setAuto(false);
  };

  return (
    <div className="app-root">
      <Navbar />

      {/* Floating color picker */}
      <div className="theme-picker">
        <p className="picker-label">Theme</p>
        <div className="picker-swatches">
          {themes.map((t, i) => (
            <button
              key={t.label}
              className={`swatch ${activeTheme === i ? "active" : ""}`}
              style={{ "--swatch-color": t.accent }}
              onClick={() => handleManual(i)}
              title={t.label}
            />
          ))}
        </div>
        <button
          className={`auto-btn ${auto ? "on" : "off"}`}
          onClick={toggleAuto}
          title={auto ? "Stop auto" : "Start auto"}
        >
          {auto ? "⏸" : "▶"}
        </button>
      </div>

      <main className="app-main">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="skills"><Skills /></section>
        <section id="contact"><Contact /></section>
      </main>
    </div>
  );
}