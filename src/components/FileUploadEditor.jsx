
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField, setActiveField } from "../features/formSlice";

const FileUploadEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label);
  const [helpText, setHelpText] = useState(field.helpText);
  const [required, setRequired] = useState(field.required);

  const handleSave = () => {
    dispatch(
      updateField({
        id: field.id,
        label,
        required,
        helpText,
      })
    );
    dispatch(setActiveField(null));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md border border-[#E5E5E5]">
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#E5E5E5] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="File Upload"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Help Text</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#E5E5E5] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#7DA0FA] rounded border-[#E5E5E5] focus:ring-[#7DA0FA]"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span className="ml-2">Required</span>
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

export default FileUploadEditor;





