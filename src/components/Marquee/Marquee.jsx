import React from "react";
import "./Marquee.scss";

const Marquee = ({ items = [], speed = 20 }) => {
  if (!items.length) return null;

  // بنكرر العناصر مرتين عشان اللوب يبقى متصل من غير فجوة
  const content = [...items, ...items];

  return (
    <div className="marquee-wrapper">
      <div
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {content.map((item, index) => (
          <span className="marquee-item" key={index}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;