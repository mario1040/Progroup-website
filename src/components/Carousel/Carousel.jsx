import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import "./Carousel.scss";

const Carousel = ({ images = [], autoPlay = true, interval = 4000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imgRefs = useRef([]);
  const timerRef = useRef(null);

  const goTo = (index) => {
    const nextIndex = (index + images.length) % images.length;
    setActiveIndex(nextIndex);
  };

  const next = () => goTo(activeIndex + 1);
  const prev = () => goTo(activeIndex - 1);

  // Autoplay
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [activeIndex, autoPlay, interval, images.length]);

  // Animate on slide change
  useEffect(() => {
    const currentImg = imgRefs.current[activeIndex];
    if (!currentImg) return;

    gsap.fromTo(
      currentImg,
      { opacity: 0, scale: 1.05 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
    );
  }, [activeIndex]);

  if (!images.length) return null;

  return (
    <div className="carousel">
      <div className="carousel-track">
        {images.map((src, index) => (
          <img
            key={index}
            ref={(el) => (imgRefs.current[index] = el)}
            src={src}
            alt={`slide-${index}`}
            className={`carousel-image${index === activeIndex ? " active" : ""}`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-arrow prev" onClick={prev} aria-label="previous">
            ‹
          </button>
          <button className="carousel-arrow next" onClick={next} aria-label="next">
            ›
          </button>

          <div className="carousel-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`carousel-dot${index === activeIndex ? " active" : ""}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;