import { useEffect, useState } from "react";
import "./ThemeSwitcher.css";

const themes = [
  { name: "Default",  bg: "#0c0c0f", accent: "#6c63ff", label: "Purple" },
  { name: "Emerald",  bg: "#0a0f0c", accent: "#10b981", label: "Emerald" },
  { name: "Rose",     bg: "#0f0a0c", accent: "#f43f5e", label: "Rose"    },
  { name: "Amber",    bg: "#0f0d09", accent: "#f59e0b", label: "Amber"   },
  { name: "Cyan",     bg: "#090e0f", accent: "#06b6d4", label: "Cyan"    },
  { name: "Slate",    bg: "#0c0d10", accent: "#94a3b8", label: "Slate"   },
];

export default function ThemeSwitcher() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = themes[active];
    const root = document.documentElement;
    root.style.setProperty("--bg",      t.bg);
    root.style.setProperty("--bg-card", adjustHex(t.bg, 8));
    root.style.setProperty("--bg-hover",adjustHex(t.bg, 14));
    root.style.setProperty("--accent",  t.accent);
    root.style.setProperty("--accent-2",lighten(t.accent));
  }, [active]);

  return (
    <div className="theme-switcher">
      <button
        className="theme-toggle"
        onClick={() => setOpen(o => !o)}
        title="Change theme"
      >
        <span className="theme-dot" style={{ background: themes[active].accent }} />
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>

      {open && (
        <div className="theme-panel">
          <p className="theme-panel-label">Theme</p>
          <div className="theme-options">
            {themes.map((t, i) => (
              <button
                key={t.name}
                className={`theme-option ${active === i ? "active" : ""}`}
                onClick={() => { setActive(i); setOpen(false); }}
                title={t.label}
              >
                <span className="option-swatch" style={{ background: t.accent }} />
                <span className="option-label">{t.label}</span>
                {active === i && <span className="option-check">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {open && <div className="theme-backdrop" onClick={() => setOpen(false)} />}
    </div>
  );
}

function adjustHex(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 0xff) + amount);
  const g = Math.min(255, ((n >> 8)  & 0xff) + amount);
  const b = Math.min(255,  (n        & 0xff) + amount);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function lighten(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 0xff) * 1.3));
  const g = Math.min(255, Math.round(((n >> 8)  & 0xff) * 1.3));
  const b = Math.min(255, Math.round(( n        & 0xff) * 1.3));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}