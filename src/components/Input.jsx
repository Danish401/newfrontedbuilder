import React from 'react';

const Input = ({ className = '', ...props }) => (
  <input
    className={`rounded-full px-4 py-2 shadow-md border border-[#b0dfd6] focus:border-[#3c9087] focus:ring-2 focus:ring-[#3c9087] transition-all duration-200 text-[#21403e] bg-[#f3faf8] w-full ${className}`}
    {...props}
  />
);

Input.displayName = 'Input';

export default Input;
