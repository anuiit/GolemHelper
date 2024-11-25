import React from "react";

function Spinner ({ size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className={`spinner-border animate-spin inline-block ${sizeClasses[size] || sizeClasses.md} border-4 border-solid border-current border-r-transparent rounded-full`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export { Spinner };