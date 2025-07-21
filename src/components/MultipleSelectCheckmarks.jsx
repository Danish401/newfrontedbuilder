import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMultipleCheckbox, setActiveField } from "../features/formSlice";

const MultipleSelectCheckmarks = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label || "");
  const [helpText, setHelpText] = useState(field.helpText || "");
  const [required, setRequired] = useState(field.required || false);
  const [options, setOptions] = useState(field.options || []);
  const [selectedOptions, setSelectedOptions] = useState(
    Array.isArray(field.selectedOptions) ? field.selectedOptions : []
  );

  // Update local state if field prop changes
  useEffect(() => {
    setLabel(field.label || "");
    setHelpText(field.helpText || "");
    setRequired(field.required || false);
    setOptions(field.options || []);
    setSelectedOptions(field.selectedOptions || []);
  }, [field]);

  const handleSave = () => {
    dispatch(
      updateMultipleCheckbox({
        id: field.id,
        label,
        required,
        helpText,
        options,
        selectedOptions,
      })
    );
    dispatch(setActiveField(null));
  };

  const handleOptionChange = (optionValue) => {
    setSelectedOptions((prevSelected) => {
      // Check if the option is already selected
      if (prevSelected.includes(optionValue)) {
        // Remove the option if already selected
        return prevSelected.filter((value) => value !== optionValue);
      } else {
        // Add the new selected option
        return [...prevSelected, optionValue];
      }
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
      <h2 className="text-lg font-semibold mb-4 text-[#4B49AC]">
        Edit Multiple Select
      </h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">
          Field Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Multiple Select"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">
          Help Text
        </label>
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
        <label className="block text-sm font-medium text-[#4B49AC]">
          Options
        </label>
        {options.map((option, index) => (
          <div key={option.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="form-checkbox text-[#7DA0FA] focus:ring-[#7DA0FA]"
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleOptionChange(option.value)}
            />
            <input
              type="text"
              className="mt-1 ml-2 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
              value={option.value || ""}
              onChange={(e) =>
                setOptions((prevOptions) =>
                  prevOptions.map((opt, i) =>
                    i === index ? { ...opt, value: e.target.value || "" } : opt
                  )
                )
              }
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
          Add Option
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

export default MultipleSelectCheckmarks;
