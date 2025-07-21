

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveField } from '../features/formSlice';
import FieldEditor from './FieldEditor'; // Ensure this file exists

const ActiveFieldForm = ({ fieldId }) => {
  const dispatch = useDispatch();
  const field = useSelector((state) =>
    state.form.fields.find((field) => field.id === fieldId)
  );

  return (
    <div className="relative p-6 border border-[#E5E5E5] rounded-lg bg-white shadow-md">
      <button
        className="absolute top-2 right-2 text-[#F3797E] hover:text-[#E74C3C] transition-colors duration-300"
        onClick={() => dispatch(setActiveField(null))}
      >
        ×
      </button>
      {field && <FieldEditor field={field} />}
    </div>
  );
};

export default ActiveFieldForm;
