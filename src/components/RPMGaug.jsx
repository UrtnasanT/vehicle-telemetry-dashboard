// RPMGauge.jsx
import React from "react";

const RPMGauge = ({ rpm = 0, max = 8000 }) => {
  const radius = 90;
  const strokeWidth = 15;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  // proportion of RPM
  const percent = Math.min(Math.max(rpm / max, 0), 1);
  const offset = circumference * (1 - percent);

  return (
    <svg
      width={center * 2}
      height={center * 2}
      style={{ display: "block", margin: "0 auto" }}
    >
      {/* Background Circle */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#333"
        strokeWidth={strokeWidth}
      />
      {/* Foreground Arc */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="#00ffcc"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      {/* Center Text */}
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dy="8"
        fontSize="28"
        fill="#00ffcc"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {rpm} RPM
      </text>
      {/* Scale Labels (optional: every 1000 RPM) */}
      {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000].map((val) => {
        const angle = (val / max) * 360 - 90;
        const rad = (angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * (radius + strokeWidth + 10);
        const y = center + Math.sin(rad) * (radius + strokeWidth + 10);
        return (
          <text
            key={val}
            x={x}
            y={y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="12"
            fill="#aaa"
          >
            {val / 1000}k
          </text>
        );
      })}
    </svg>
  );
};

export default RPMGauge;
