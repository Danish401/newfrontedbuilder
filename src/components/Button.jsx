// src/components/Button.js
import React from "react";

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`rounded-full px-6 py-2 font-semibold shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#3c9087] 
      bg-[#3c9087] hover:bg-[#2e736d] text-[#f3faf8] 
      ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
