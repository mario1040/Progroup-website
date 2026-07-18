import React, { useRef } from "react";
import "./FinalCTASection.scss";

const WHATSAPP_NUMBER = "201149238763";
const WHATSAPP_MESSAGE =
  "Hi! I checked out your portfolio and I'd love to talk about a project.";

const FinalCTASection = () => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const strength = 0.3;
    btn.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0, 0)";
  };

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="signal-section">
      <div className="signal-backdrop" aria-hidden="true" />

      <div className="signal-orbit-field" aria-hidden="true">
        <svg viewBox="0 0 300 300" className="signal-orbit-text">
          <defs>
            <path
              id="signal-circle-path"
              d="M150,150 m-124,0 a124,124 0 1,1 248,0 a124,124 0 1,1 -248,0"
            />
          </defs>
          <text>
            <textPath href="#signal-circle-path" startOffset="0%">
              AVAILABLE FOR NEW PROJECTS &nbsp;•&nbsp; CHAT ON WHATSAPP &nbsp;•&nbsp;
              AVAILABLE FOR NEW PROJECTS &nbsp;•&nbsp; CHAT ON WHATSAPP &nbsp;•&nbsp;
            </textPath>
          </text>
        </svg>
      </div>

      <div className="signal-content">
        <span className="signal-eyebrow">Let's Talk</span>

        <h2 className="signal-headline">
          <span className="signal-line">
            <span>Got a space</span>
          </span>
          <span className="signal-line signal-line-2">
            <span>
              worth <em>imagining?</em>
            </span>
          </span>
        </h2>

        <div
          className="signal-button-zone"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <span className="signal-ping ping-1" aria-hidden="true" />
          <span className="signal-ping ping-2" aria-hidden="true" />
          <span className="signal-ping ping-3" aria-hidden="true" />

          <button
            ref={btnRef}
            type="button"
            className="signal-button"
            onClick={handleClick}
            aria-label="Message us on WhatsApp"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2zm5.8 14.1c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02 1.12.99 2.06 1.31 2.36 1.45.29.15.46.13.63-.08.17-.21.72-.84.92-1.13.19-.29.38-.24.63-.14.26.1 1.66.78 1.94.92.29.14.48.21.55.33.07.13.07.72-.17 1.4z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        <p className="signal-sub">or reach us directly — +20 11 4923 8763</p>
      </div>
    </section>
  );
};

export default FinalCTASection;