import React from "react";
import "./Marquee.scss";

const Marquee = ({ 
  items = [], 
  speed = 30, // سرعة الحركة بالثواني
  pauseOnHover = true, 
  reverse = false 
}) => {
  if (!items.length) return null;

  return (
    // إضافة كلاس لإيقاف الحركة عند الـ Hover
    <div className={`marquee-wrapper ${pauseOnHover ? 'pause-on-hover' : ''}`}>
      <div 
        className={`marquee-track ${reverse ? 'reverse' : ''}`} 
        style={{ '--duration': `${speed}s` }}
      >
        
        {/* المجموعة الأولى */}
        <div className="marquee-group">
          {items.map((item, index) => (
            <div className="marquee-item" key={`g1-${index}`}>
              <span className="text">{item}</span>
              <span className="separator">✦</span>
            </div>
          ))}
        </div>

        {/* المجموعة الثانية (نسخة مطابقة للاستمرار بدون فجوات) */}
        {/* aria-hidden="true" عشان الـ Screen Readers متقراش الكلام مرتين */}
        <div className="marquee-group" aria-hidden="true">
          {items.map((item, index) => (
            <div className="marquee-item" key={`g2-${index}`}>
              <span className="text">{item}</span>
              <span className="separator">✦</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Marquee;