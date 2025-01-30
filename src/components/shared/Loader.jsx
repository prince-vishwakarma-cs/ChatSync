import React from "react";

const GradientCircularLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <svg className="w-16 h-16 animate-spin-slow" viewBox="0 0 50 50">
        <defs>
          <linearGradient id="gradient">
            <stop offset="0%" stopColor="#1eb954" />
            <stop offset="50%" stopColor="#1eb954" />
            <stop offset="100%" stopColor="#17572e" />
          </linearGradient>
        </defs>
        <circle
          className="opacity-100"
          cx="25"
          cy="25"
          r="20"
          stroke="#17572e"
          strokeWidth="6"
          fill="transparent"
        />
        <circle
          className="opacity-75"
          cx="25"
          cy="25"
          r="20"
          stroke="url(#gradient)"
          strokeWidth="6"
          strokeDasharray="100"
          strokeDashoffset="0"
          fill="transparent"
        />
      </svg>
    </div>
  );
};

export default GradientCircularLoader;
