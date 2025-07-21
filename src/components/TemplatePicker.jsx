import React from "react";

const templateNames = [
  "Modern",
  "Card",
  "Minimal",
  "Dark Mode",
  "Vertical Bar",
  "Pastel Banner",
  "Two-Column",
  "Stepper",
  "Floating Label",
  "Glassmorphism",
  "Invoice (Business)",
  "Company Profile (Business)",
  "Event Registration (Business)",
  "Job Application (Business)",
  "Feedback/Survey (Business)",
  "Purchase Order (Business)",
  "Appointment Booking (Business)"
];

const TemplatePicker = ({ selectedId, onSelect }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-6">
    {templateNames.map((name, idx) => (
      <button
        key={idx}
        className={`border-2 rounded-lg p-4 flex flex-col items-center shadow transition-all duration-200 focus:outline-none ${
          selectedId === idx + 1
            ? "border-[#4B49AC] bg-[#e6e7ff] scale-105"
            : "border-gray-200 bg-white hover:scale-105"
        }`}
        onClick={() => onSelect(idx + 1)}
        type="button"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#7DA0FA] to-[#4B49AC] rounded-full mb-2 flex items-center justify-center text-white text-2xl font-bold">
          {idx + 1}
        </div>
        <span className="text-sm font-semibold text-[#4B49AC]">{name}</span>
      </button>
    ))}
  </div>
);

export default TemplatePicker; 