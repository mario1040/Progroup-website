import React from "react";
import { useNavigate } from "react-router";

const FinalCTASection = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="about-section about-cta-section">
      <div className="about-cta-card">
        <div>
          <h3 className="about-section-title" style={{ fontSize: "22px" }}>
            Have a project in mind?
          </h3>
          <p className="about-cta-text">
            Let's turn your vision into an experience worth exploring.
          </p>
        </div>
        <button
          className="about-primary-button"
          onClick={() => navigate("/contact")}
        >
          Get in Touch
        </button>
      </div>
    </section>
  );
};

export default FinalCTASection;