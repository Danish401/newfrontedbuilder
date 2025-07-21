import React, { useState, useEffect } from 'react';

const PhoneNumberFieldEditor = ({ field, onChange, onClose }) => {
  const [label, setLabel] = useState(field.label || 'Phone Number');
  const [required, setRequired] = useState(!!field.required);

  useEffect(() => {
    setLabel(field.label || 'Phone Number');
    setRequired(!!field.required);
  }, [field]);

  useEffect(() => {
    onChange(field.id, {
      ...field,
      label,
      required,
    });
    // eslint-disable-next-line
  }, [label, required]);

  return (
    <div className="p-4 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit Phone Number Field</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Field Name</label>
        <input
          type="text"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          checked={required}
          onChange={e => setRequired(e.target.checked)}
          className="mr-2"
        />
        <span>Mandatory</span>
      </div>
    </div>
  );
};

export default PhoneNumberFieldEditor; 