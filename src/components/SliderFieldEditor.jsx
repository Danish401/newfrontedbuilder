import React, { useState } from "react";

const SliderFieldEditor = ({ field, onClose, handleFieldChange }) => {
  const [label, setLabel] = useState(field.label || "");
  const [min, setMin] = useState(field.min || 0);
  const [max, setMax] = useState(field.max || 100);
  const [step, setStep] = useState(field.step || 1);

  const handleSave = () => {
    if (handleFieldChange) {
      handleFieldChange(field.id, { label, min, max, step });
    }
    if (onClose) onClose();
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#E5E5E5]">
      <h2 className="text-lg font-semibold mb-4 text-[#4B49AC]">Edit Slider Field</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={label}
          onChange={e => setLabel(e.target.value)}
          placeholder="Slider Field Name"
        />
      </div>
      <div className="mb-6 flex gap-4">
        <div>
          <label className="block text-sm font-medium text-[#4B49AC]">Min</label>
          <input
            type="number"
            className="mt-1 block w-20 border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
            value={min}
            onChange={e => setMin(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B49AC]">Max</label>
          <input
            type="number"
            className="mt-1 block w-20 border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
            value={max}
            onChange={e => setMax(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#4B49AC]">Step</label>
          <input
            type="number"
            className="mt-1 block w-20 border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
            value={step}
            onChange={e => setStep(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#7978E9] focus:outline-none focus:ring-2 focus:ring-[#7DA0FA] transition-colors duration-300"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SliderFieldEditor; 