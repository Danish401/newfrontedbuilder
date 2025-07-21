
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateOptionGroup, setActiveField } from "../features/formSlice";

const OptionGroupEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label);
  const [helpText, setHelpText] = useState(field.helpText);
  const [required, setRequired] = useState(field.required);
  const [options, setOptions] = useState(field.options);

  const handleSave = () => {
    dispatch(
      updateOptionGroup({
        id: field.id,
        label,
        required,
        helpText,
        options,
      })
    );
    dispatch(setActiveField(null));
  };

  const handleOptionChange = (index, value) => {
    setOptions((prevOptions) => {
      const newOptions = prevOptions.map((option, i) =>
        i === index ? { ...option, value } : option
      );
      return newOptions;
    });
  };

  const handleAddOption = () => {
    setOptions((prevOptions) => [
      ...prevOptions,
      { id: Date.now(), value: "" },
    ]);
  };

  const handleDeleteOption = (index) => {
    setOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#E5E5E5]">
      <h2 className="text-lg font-semibold mb-4 text-[#4B49AC]">Edit Option Group</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Option Group"
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
        <label className="block text-sm font-medium text-[#4B49AC]">Options</label>
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
              type="text"
              className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
              value={option.value}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <button
              className="text-[#DA0FA] ml-2 hover:text-[#F3797E] transition-colors duration-300"
              onClick={() => handleDeleteOption(index)}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="bg-[#4B49AC] text-white px-4 py-2 rounded-md mt-2 hover:bg-[#7978E9] focus:outline-none focus:ring-2 focus:ring-[#7DA0FA] transition-colors duration-300"
          onClick={handleAddOption}
        >
          Add Item
        </button>
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

export default OptionGroupEditor;
