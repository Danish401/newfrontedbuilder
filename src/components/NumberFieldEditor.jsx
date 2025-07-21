import React, { useState, useEffect } from "react";

const NumberFieldEditor = ({ field, onChange, onClose }) => {
  const [label, setLabel] = useState(field.label || "");
  const [required, setRequired] = useState(field.required || false);
  const [decimal, setDecimal] = useState(field.decimal || false);

  useEffect(() => {
    setLabel(field.label || "");
    setRequired(field.required || false);
    setDecimal(field.decimal || false);
  }, [field]);

  const handleSave = () => {
    onChange(field.id, {
      ...field,
      label,
      required,
      decimal,
    }, "number");
    onClose();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold mb-2">Edit Number Field</h3>
      <label className="flex flex-col gap-1">
        Field Name
        <input
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={required}
          onChange={e => setRequired(e.target.checked)}
        />
        Required
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={decimal}
          onChange={e => setDecimal(e.target.checked)}
        />
        Allow decimal/floating point
      </label>
      <div className="flex gap-2 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NumberFieldEditor; 
