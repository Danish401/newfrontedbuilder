import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCheckbox } from "../features/formSlice";

const CheckboxFieldEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label);
  const [helpText, setHelpText] = useState(field.helpText);
  const [required, setRequired] = useState(field.required);
  const [defaultChecked, setDefaultChecked] = useState(!!field.value);

  const handleSave = () => {
    dispatch(
      updateCheckbox({
        id: field.id,
        label,
        required,
        helpText,
        checked: defaultChecked,
        value: defaultChecked,
      })
    );
    // Close editor or perform other UI actions
  };

  // Main interactive checkbox (the one user will check/uncheck in the form builder)
  const handleMainCheckboxChange = (e) => {
    dispatch(
      updateCheckbox({
        id: field.id,
        label,
        required,
        helpText,
        checked: e.target.checked,
        value: e.target.checked,
      })
    );
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#E5E5E5]">
      <h2 className="text-lg font-semibold mb-4 text-[#4B49AC]">Edit Checkbox</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Label</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Help Text</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span className="ml-2">Required</span>
        </label>
      </div>
      <div className="mb-6">
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
            checked={defaultChecked}
            onChange={(e) => setDefaultChecked(e.target.checked)}
          />
          <span className="ml-2">Checked by default</span>
        </label>
      </div>
      <div className="mb-6">
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#4B49AC] border-2 rounded-md focus:ring-[#7DA0FA] transition-colors duration-300 ease-in-out"
            checked={!!field.value}
            onChange={handleMainCheckboxChange}
          />
          <span className="ml-2">{label}</span>
        </label>
      </div>
      <div className="flex justify-end">
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

export default CheckboxFieldEditor;
