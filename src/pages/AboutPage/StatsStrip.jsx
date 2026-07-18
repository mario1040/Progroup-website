import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./StatsStrip.scss";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 15, suffix: "+", label: "Years of Craftsmanship" },
  { value: 350, suffix: "+", label: "Bespoke Kitchens Delivered" },
  { value: 45, suffix: "+", label: "Premium Materials Sourced" },
  { value: 24, suffix: "+", label: "Design Excellence Awards" },
];

const StatsStrip = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    // السكرولر الحقيقي عندك مش الـ window — دور عليه جوه الشجرة
    const scrollerEl = sectionRef.current?.closest(".side-panel-inner-wrapper");

    let rafId;
    const ctx = gsap.context(() => {
      gsap.set(cardRefs.current, { opacity: 0, y: 40 });

      gsap.to(cardRefs.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: scrollerEl || undefined, // لو لقيناه استخدمه، لو لأ سيبه على الـ window
          start: "top 85%",
          // "reset" بدل "none" الأخيرة يخلي الأنيميشن يرجع لحالته الأولى
          // لو خرجت من فوق القسم، عشان لو حصل remount أو دخول تاني يشتغل صح
          toggleActions: "play none none reset",
        },
      });

      numberRefs.current.forEach((el, index) => {
        if (!el) return;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: stats[index].value,
          duration: 2,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller: scrollerEl || undefined,
            start: "top 85%",
            toggleActions: "restart none none none",
          },
          onUpdate: () => {
            el.textContent = Math.floor(counter.val);
          },
        });
      });
    }, sectionRef);

    // مهم: لو الـ panel نفسه بيعمل transition دخول (زي اللي في Page.jsx)
    // ScrollTrigger ممكن ياخد قياسات غلط وهو لسه بيتحرك.
    // الـ refresh ده بيخلي GSAP يعيد الحساب بعد ما كل حاجة تستقر.
    rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section about-stats">
      <div className="about-stats-grid">
        {stats.map((stat, index) => (
          <div
            className="about-stat-card"
            key={stat.label}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="about-stat-accent-line"></div>

            <div className="about-stat-number">
              <span ref={(el) => (numberRefs.current[index] = el)}>0</span>
              <span className="about-stat-suffix">{stat.suffix}</span>
            </div>
            <p className="about-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;