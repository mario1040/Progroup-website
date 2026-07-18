import React, { useState, useRef, useEffect, useCallback } from "react";
import "./Carousel.scss";

const Carousel = ({ images = [], autoPlay = true, interval = 4500 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [isPaused, setIsPaused] = useState(false); // للتحكم في توقف الـ Progress Bar
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const trackRef = useRef(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => {
      setDirection("next");
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const prev = () => {
    setActiveIndex((prevIndex) => {
      setDirection("prev");
      return (prevIndex - 1 + images.length) % images.length;
    });
  };

  // Autoplay Logic
  useEffect(() => {
    if (!autoPlay || images.length <= 1 || isPaused) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, images.length, next, isPaused, activeIndex]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // Spotlight Effect (تتبع الماوس)
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  // Touch / swipe support
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40;

    if (deltaX > threshold) {
      prev();
    } else if (deltaX < -threshold) {
      next();
    }
    touchStartX.current = null;
    setIsPaused(false);
  };

  if (!images.length) return null;

  return (
    <div
      className="carousel"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Overlay Gradient (يتم إضافته عبر الـ CSS ::after) */}

      <div className="carousel-track" ref={trackRef}>
        {images.map((src, index) => {
          let state = "hidden";
          if (index === activeIndex) state = "active";
          else if (
            (direction === "next" && index === (activeIndex - 1 + images.length) % images.length) ||
            (direction === "prev" && index === (activeIndex + 1) % images.length)
          ) {
            state = "prev-slot";
          }

          return (
            <div key={index} className={`carousel-slide ${state} ${direction}`}>
              <img src={src} alt={`slide-${index + 1}`} className="carousel-image" />
            </div>
          );
        })}
      </div>

      {images.length > 1 && (
        <>
          {/* عداد الصور */}
          <div className="carousel-counter">
            {String(activeIndex + 1).padStart(2, "0")}
            <span>/</span>
            {String(images.length).padStart(2, "0")}
          </div>

          {/* الأزرار بتقنية Glass Morphism */}
          <button
            className="carousel-arrow prev"
            onClick={() => { prev(); setIsPaused(false); }}
            aria-label="previous"
          >
            ‹
          </button>
          <button
            className="carousel-arrow next"
            onClick={() => { next(); setIsPaused(false); }}
            aria-label="next"
          >
            ›
          </button>

          {/* مؤشر التقدم بدلاً من النقاط التقليدية */}
          <div className="carousel-progress">
            <div
              key={activeIndex} // إجبار الـ div على إعادة الرندر مع كل صورة ليبدأ الأنيميشن من جديد
              className="carousel-progress-fill"
              style={{
                animationDuration: `${interval}ms`,
                animationPlayState: isPaused || !autoPlay ? "paused" : "running"
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;