// src/components/DropdownEditor.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateField } from '../features/formSlice';

const DropdownEditor = ({ field }) => {
  const dispatch = useDispatch();

  const handleLabelChange = (e) => {
    dispatch(updateField({ id: field.id, label: e.target.value }));
  };

  return (
    <div>
      <h3>Dropdown Editor</h3>
      <input
        type="text"
        value={field.label}
        onChange={handleLabelChange}
        className="border-2 border-gray-300 rounded-md"
      />
    </div>
  );
};

export default DropdownEditor;
