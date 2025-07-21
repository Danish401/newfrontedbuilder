
// css

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveField,
  updateFieldValue,
  updateField,
  deleteField,
} from '../features/formSlice';

const Field = ({ field }) => {
  const dispatch = useDispatch();
  const activeFieldId = useSelector((state) => state.form.activeFieldId);

  const handleChange = (e) => {
    dispatch(updateFieldValue({ id: field.id, value: e.target.value }));
  };

  const handleUpdate = () => {
    dispatch(setActiveField(field.id));
  };

  const handleDelete = () => {
    dispatch(deleteField(field.id));
  };

  return (
    <div
      className={`p-4 border rounded-md mb-2 ${field.id === activeFieldId ? 'bg-[#E5E5E5]' : 'bg-white'} shadow-sm`}
    >
      <input
        type="text"
        value={field.label}
        onChange={(e) =>
          dispatch(
            updateField({
              id: field.id,
              label: e.target.value,
            })
          )
        }
        placeholder="Label"
        className="p-2 border-2 border-[#E5E5E5] rounded-md mb-2 w-full focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
      />
      <input
        type="text"
        value={field.placeholder}
        onChange={(e) =>
          dispatch(
            updateField({
              id: field.id,
              placeholder: e.target.value,
            })
          )
        }
        placeholder="Placeholder"
        className="p-2 border-2 border-[#E5E5E5] rounded-md mb-2 w-full focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
      />
      {field.type === 'optionGroup' && (
        <div className="mt-2">
          <h3 className="font-semibold text-[#4B49AC] mb-2">Options</h3>
          {field.options.map((option) => (
            <div key={option.id} className="mb-2">
              <input
                type="text"
                value={option.value}
                onChange={(e) =>
                  dispatch(
                    updateField({
                      id: field.id,
                      options: field.options.map((o) =>
                        o.id === option.id
                          ? { ...o, value: e.target.value }
                          : o
                      ),
                    })
                  )
                }
                placeholder="Option"
                className="p-2 border-2 border-[#E5E5E5] rounded-md mb-1 w-full focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
              />
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handleUpdate}
          className="bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#3D3A8C] focus:outline-none focus:ring-2 focus:ring-[#7DA0FA] transition-colors duration-300"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-[#F3797E] text-white px-4 py-2 rounded-md hover:bg-[#E74C3C] focus:outline-none focus:ring-2 focus:ring-[#F3797E] transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Field;
