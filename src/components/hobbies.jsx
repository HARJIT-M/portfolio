import { useEffect, useRef, useState } from "react";
import "./Hobbies.css";

const SPOTIFY_TRACKS = [
  {
    id: "4uLU6hMCjMI75M1A2tKUQC",
    title: "Jai Ho",
    artist: "A. R. Rahman",
    album: "Slumdog Millionaire",
  },
  {
    id: "0nJW01T7XtvILxQgC5J7Wh",
    title: "Vande Mataram",
    artist: "A. R. Rahman",
    album: "Vande Mataram",
  },
];

const favorites = [
  {
    category: "Favorite Singer",
    name: "A. R. Rahman",
    subtitle: "Oscar · Grammy · Legend",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/73/AR_Rahman.jpg",
    tag: "Music",
    accent: "#1db954",
  },
  {
    category: "Favorite Cricketer",
    name: "Virat Kohli",
    subtitle: "King Kohli · Run Machine",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Virat_Kohli_in_New_Delhi_in_December_2018.jpg",
    tag: "Cricket",
    accent: "#6c63ff",
  },
];

export default function Hobbies() {
  const [visible, setVisible] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(32);
  const [tick, setTick] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { setPlaying(false); return 0; }
        return p + 0.3;
      });
      setTick((t) => t + 1);
    }, 100);
    return () => clearInterval(t);
  }, [playing]);

  const fmt = (pct) => {
    const total = 210;
    const sec = Math.floor((pct / 100) * total);
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
  };

  const bars = Array.from({ length: 28 });

  return (
    <section className="hobbies" id="hobbies" ref={ref}>
      <div className="section-inner">

        <div className={`section-label ${visible ? "fade-up" : ""}`}>
          <span className="label-line" />
          Interests
        </div>

        <h2 className={`section-title ${visible ? "fade-up delay-1" : ""}`}>
          Beyond <span className="title-accent">the code</span>
        </h2>

        <div className="hobbies-grid">

          {/* Spotify Player */}
          <div className={`spotify-card ${visible ? "fade-up delay-2" : ""}`}>
            <div className="spotify-header">
              <svg className="spotify-logo" viewBox="0 0 24 24" fill="#1db954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <div>
                <p className="spotify-app">Spotify</p>
                <p className="spotify-sub">Now Playing</p>
              </div>
              <div className="spotify-live">
                <span className="live-dot" />
                LIVE
              </div>
            </div>

            {/* Track selector */}
            <div className="track-list">
              {SPOTIFY_TRACKS.map((t, i) => (
                <button
                  key={t.id}
                  className={`track-item ${activeTrack === i ? "active" : ""}`}
                  onClick={() => { setActiveTrack(i); setProgress(0); setPlaying(false); }}
                >
                  <span className="track-num">{i + 1}</span>
                  <div className="track-info">
                    <span className="track-title">{t.title}</span>
                    <span className="track-artist">{t.artist}</span>
                  </div>
                  {activeTrack === i && playing && <span className="track-eq">▶</span>}
                </button>
              ))}
            </div>

            {/* Player UI */}
            <div className="player">
              <div className="player-album">
                <div className="album-art">
                  <svg viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="#1a1a2e"/>
                    <circle cx="40" cy="40" r="24" fill="#111"/>
                    <circle cx="40" cy="40" r="6" fill="#1db954"/>
                    {[16,20,26,32].map((r, i) => (
                      <circle key={i} cx="40" cy="40" r={r} stroke="#1db954"
                        strokeWidth="0.5" strokeOpacity={0.15 + i * 0.1} fill="none"/>
                    ))}
                  </svg>
                  <div className={`album-spin ${playing ? "spinning" : ""}`} />
                </div>
              </div>

              <div className="player-body">
                <p className="player-title">{SPOTIFY_TRACKS[activeTrack].title}</p>
                <p className="player-artist">{SPOTIFY_TRACKS[activeTrack].artist}</p>

                {/* Waveform visualizer */}
                <div className="waveform">
                  {bars.map((_, i) => (
                    <div
                      key={i}
                      className={`waveform-bar ${playing ? "active" : ""}`}
                      style={{
                        height: `${10 + Math.sin((i + tick * 0.4) * 0.8) * 10 + Math.random() * (playing ? 8 : 0)}px`,
                        animationDelay: `${i * 0.04}s`,
                        opacity: i / bars.length < progress / 100 ? 1 : 0.25,
                      }}
                    />
                  ))}
                </div>

                {/* Progress bar */}
                <div className="progress-wrap">
                  <span className="prog-time">{fmt(progress)}</span>
                  <div
                    className="progress-track"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setProgress(((e.clientX - rect.left) / rect.width) * 100);
                    }}
                  >
                    <div className="progress-fill" style={{ width: `${progress}%` }}>
                      <span className="progress-thumb" />
                    </div>
                  </div>
                  <span className="prog-time">3:30</span>
                </div>

                {/* Controls */}
<div className="controls">
  <button className="ctrl-btn" onClick={() => { setActiveTrack(t => (t - 1 + SPOTIFY_TRACKS.length) % SPOTIFY_TRACKS.length); setProgress(0); setPlaying(false); }}>
    ⏮
  </button>
  <button className="ctrl-btn play-btn" onClick={() => setPlaying(p => !p)}>
    {playing ? "⏸" : "▶"}
  </button>
  <button className="ctrl-btn" onClick={() => { setActiveTrack(t => (t + 1) % SPOTIFY_TRACKS.length); setProgress(0); setPlaying(false); }}>
    ⏭
  </button>
  <a href={`https://open.spotify.com/track/${SPOTIFY_TRACKS[activeTrack].id}`} target="_blank" rel="noreferrer" className="spotify-open-btn">
  Open in Spotify ↗
</a>
</div>
              </div>
            </div>

            {/* Embed for actual playback */}
            <iframe
              key={SPOTIFY_TRACKS[activeTrack].id}
              src={`https://open.spotify.com/embed/track/${SPOTIFY_TRACKS[activeTrack].id}`}
              width="100%" height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="spotify-embed"
            />
          </div>

          {/* Favorites */}
          <div className="favorites-col">
            {favorites.map((f, i) => (
              <div
                key={f.name}
                className={`fav-card ${visible ? "fade-up" : ""}`}
                style={{ animationDelay: `${0.3 + i * 0.15}s`, "--fav-accent": f.accent }}
              >
                <div className="fav-img-wrap">
                  <img src={f.img} alt={f.name} className="fav-img" />
                  <div className="fav-img-overlay" />
                </div>
                <div className="fav-body">
                  <span className="fav-category">{f.category}</span>
                  <h3 className="fav-name">{f.name}</h3>
                  <p className="fav-subtitle">{f.subtitle}</p>
                  <span className="fav-tag" style={{ color: f.accent, borderColor: f.accent, background: `${f.accent}12` }}>
                    {f.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}