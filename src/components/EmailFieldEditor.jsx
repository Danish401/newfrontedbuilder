import React, { useState, useEffect } from 'react';

const EmailFieldEditor = ({ field, onChange, onClose }) => {
  const [label, setLabel] = useState(field.label || 'Email');
  const [required, setRequired] = useState(!!field.required);
  const [validation, setValidation] = useState(field.validation || { pattern: '', message: '' });

  useEffect(() => {
    setLabel(field.label || 'Email');
    setRequired(!!field.required);
    setValidation(field.validation || { pattern: '', message: '' });
  }, [field]);

  useEffect(() => {
    onChange(field.id, {
      ...field,
      label,
      required,
      validation,
    });
    // eslint-disable-next-line
  }, [label, required, validation]);

  return (
    <div className="p-4 w-96">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Edit Email Field</h2>
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Validation Pattern</label>
        <input
          type="text"
          value={validation.pattern}
          onChange={e => setValidation(v => ({ ...v, pattern: e.target.value }))}
          placeholder="e.g. ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <label className="block text-xs text-gray-500 mt-1">Leave blank for default email validation.</label>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Validation Message</label>
        <input
          type="text"
          value={validation.message}
          onChange={e => setValidation(v => ({ ...v, message: e.target.value }))}
          placeholder="Custom error message"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default EmailFieldEditor; 