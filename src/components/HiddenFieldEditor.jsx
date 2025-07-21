import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField, setActiveField } from '../features/formSlice';

const HiddenFieldEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label);
  const [value, setValue] = useState(field.value);
  const [required, setRequired] = useState(field.required);

  const handleSave = () => {
    dispatch(updateField({ id: field.id, label, placeholder: '', required, value }));
    dispatch(setActiveField(null));
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-900">Hidden Value</label>
        <input
          type="password"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center text-gray-900">
          <input
            type="checkbox"
            className="form-checkbox text-blue-600 focus:ring-blue-500"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span className="ml-2">Required</span>
        </label>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default HiddenFieldEditor;
