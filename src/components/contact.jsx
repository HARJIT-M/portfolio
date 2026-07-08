import { useEffect, useRef, useState } from "react";
import "./contact.css";

const socials = [
  { label: "Email", value: "harjitrm@gmail.com", href: "mailto:harjitrm@gmail.com" },
  { label: "GitHub", value: "github.com/harjit", href: "https://github.com/HARJIT-M" },
  { label: "LinkedIn", value: "linkedin.com/in/harjit", href: "https://www.linkedin.com/in/harjit-mahendran-25128332b/" },
];

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="section-inner">

        <div className={`section-label ${visible ? "fade-up" : ""}`}>
          <span className="label-line" />
          Contact
        </div>

        <div className="contact-grid">
          <div className={`contact-left ${visible ? "fade-up delay-1" : ""}`}>
            <h2 className="section-title">
              Let's work<br />
              <span className="title-accent">together</span>
            </h2>
            <p className="contact-desc">
              I'm currently open to internships, freelance work, and
              collaborations. Drop me a message and I'll get back to you
              within 24 hours.
            </p>

            <div className="socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-row">
                  <span className="social-label">{s.label}</span>
                  <span className="social-value">{s.value} ↗</span>
                </a>
              ))}
            </div>

            <a href="/resume.pdf" download="HARJIT-MAHENDRAN-RESUME.pdf" className="resume-download">
              <span className="rd-icon">↓</span>
              <div>
                <p className="rd-title">Download Resume</p>
                <p className="rd-sub">PDF · Updated 2025</p>
              </div>
            </a>
          </div>

          <div className={`contact-right ${visible ? "fade-up delay-2" : ""}`}>
            {sent ? (
              <div className="sent-box">
                <span className="sent-icon">✓</span>
                <p className="sent-title">Message sent!</p>
                <p className="sent-sub">I'll get back to you soon.</p>
              </div>
            ) : (
              <div className="contact-form">
                <div className="form-row">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="form-row">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input form-textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    rows={5}
                  />
                </div>
                <button className="form-submit" onClick={handleSubmit}>
                  Send Message <span>→</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="contact-footer">
          <span>© 2025 Harjit. Built with React.</span>
          <span>Designed & developed by Harjit</span>
        </div>

      </div>
    </section>
  );
}