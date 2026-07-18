import React from "react";
import { useNavigate } from "react-router";
import "./ServicesCTA.scss";

const ServicesCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="svc-section svc-cta-section" data-page-reveal>
      <div className="svc-cta-strip">
        <p>Not sure which unit fits your project?</p>
        <button className="svc-cta-button" onClick={() => navigate("/contact")}>
          Let's Scope It Together
        </button>
      </div>
    </section>
  );
};

export default ServicesCTA;