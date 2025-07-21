// it used for add order field 
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateField, setActiveField } from '../features/formSlice';

const FieldEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder);
  const [required, setRequired] = useState(field.required);
  const [maxLength, setMaxLength] = useState(field.maxLength || '');
  const [autoGrow, setAutoGrow] = useState(!!field.autoGrow);
  const [rows, setRows] = useState(field.rows || 3);

  const handleSave = () => {
    const update = { id: field.id, label, placeholder, required };
    if (field.type === 'textarea') {
      update.maxLength = maxLength ? parseInt(maxLength) : undefined;
      update.autoGrow = autoGrow;
      update.rows = rows ? parseInt(rows) : 3;
    }
    dispatch(updateField(update));
    dispatch(setActiveField(null));
  };

  return (
    <div className="p-6 max-w-md mx-auto rounded-2xl shadow-lg" style={{ background: '#F3F4F8', border: '1px solid #A389F4' }}>
      <div className="mb-4">
        <label className="block text-sm font-semibold" style={{ color: '#6C63FF' }}>Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 rounded-lg shadow-sm focus:outline-none transition-colors duration-300 px-3 py-2"
          style={{ borderColor: '#A389F4', background: '#FFFFFF', color: '#2D2D2D', '::placeholder': { color: '#B2F0FF' } }}
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Field name..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold" style={{ color: '#6C63FF' }}>Placeholder</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 rounded-lg shadow-sm focus:outline-none transition-colors duration-300 px-3 py-2"
          style={{ borderColor: '#A389F4', background: '#FFFFFF', color: '#2D2D2D', '::placeholder': { color: '#B2F0FF' } }}
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Placeholder..."
        />
      </div>
      {field.type === 'textarea' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-semibold" style={{ color: '#6C63FF' }}>Max Length</label>
            <input
              type="number"
              min="1"
              className="mt-1 block w-full border-2 rounded-lg shadow-sm focus:outline-none transition-colors duration-300 px-3 py-2"
              style={{ borderColor: '#A389F4', background: '#FFFFFF', color: '#2D2D2D', '::placeholder': { color: '#B2F0FF' } }}
              value={maxLength}
              onChange={e => setMaxLength(e.target.value)}
              placeholder="Max length..."
            />
            {maxLength && (
              <div className="text-xs text-gray-500 mt-1">Character limit: {maxLength}</div>
            )}
          </div>
          <div className="mb-4">
            <label className="flex items-center" style={{ color: '#6C63FF' }}>
              <input
                type="checkbox"
                className="form-checkbox accent-[#A389F4] focus:ring-[#FF7EB3]"
                checked={autoGrow}
                onChange={e => setAutoGrow(e.target.checked)}
              />
              <span className="ml-2">Auto-grow (expand as you type)</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold" style={{ color: '#6C63FF' }}>Rows (default height)</label>
            <input
              type="number"
              min="1"
              className="mt-1 block w-full border-2 rounded-lg shadow-sm focus:outline-none transition-colors duration-300 px-3 py-2"
              style={{ borderColor: '#A389F4', background: '#FFFFFF', color: '#2D2D2D', '::placeholder': { color: '#B2F0FF' } }}
              value={rows}
              onChange={e => setRows(e.target.value)}
              placeholder="Rows..."
            />
          </div>
        </>
      )}
      <div className="mb-4">
        <label className="flex items-center" style={{ color: '#6C63FF' }}>
          <input
            type="checkbox"
            className="form-checkbox accent-[#A389F4] focus:ring-[#FF7EB3]"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span className="ml-2">Required</span>
        </label>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300"
          style={{ background: 'linear-gradient(90deg, #FF7EB3 0%, #A389F4 50%, #698CF2 100%)', color: '#fff', boxShadow: '0 4px 16px 0 #A389F420' }}
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FieldEditor;




