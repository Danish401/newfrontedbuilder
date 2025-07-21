import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateField, setActiveField } from "../features/formSlice";

const OrderTitleEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label || "");
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");
  const [required, setRequired] = useState(field.required || false);
  const [encrypt, setEncrypt] = useState(field.encrypt || false);
  const [maxLength, setMaxLength] = useState(field.maxLength || "");
  const [isBold, setIsBold] = useState(field.isBold || false);
  const [isItalic, setIsItalic] = useState(field.isItalic || false);
  const [textColor, setTextColor] = useState(field.textColor || "#000000");

  // Sync local state with field prop whenever it changes
  useEffect(() => {
    setLabel(field.label || "");
    setPlaceholder(field.placeholder || "");
    setRequired(field.required || false);
    setEncrypt(field.encrypt || false);
    setMaxLength(field.maxLength || "");
    setIsBold(field.isBold || false);
    setIsItalic(field.isItalic || false);
    setTextColor(field.textColor || "#000000");
  }, [field]);

  const handleSave = () => {
    dispatch(
      updateField({
        id: field.id,
        label,
        placeholder,
        required,
        encrypt,
        maxLength: maxLength ? parseInt(maxLength) : null,
        isBold,
        isItalic,
        textColor,
      })
    );
    dispatch(setActiveField(null));
  };

  const handleCancel = () => {
    dispatch(setActiveField(null));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#E5E5E5]">
      <h2 className="text-lg font-semibold mb-4 text-[#4B49AC]">Edit Order Title Field</h2>
      
      {/* Field Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC] mb-2">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300 px-3 py-2"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Order Title"
        />
      </div>

      {/* Placeholder */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC] mb-2">Placeholder</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300 px-3 py-2"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
          placeholder="Enter order title"
        />
      </div>

      {/* Max Character Limit */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC] mb-2">Max Characters</label>
        <input
          type="number"
          min="1"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300 px-3 py-2"
          value={maxLength}
          onChange={(e) => setMaxLength(e.target.value)}
          placeholder="Leave empty for no limit"
        />
        <p className="text-xs text-gray-500 mt-1">Leave empty for no character limit</p>
      </div>

      {/* Text Formatting Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC] mb-2">Text Formatting</label>
        <div className="space-y-3">
          {/* Bold and Italic */}
          <div className="flex space-x-4">
            <label className="flex items-center text-[#4B49AC]">
              <input
                type="checkbox"
                className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
                checked={isBold}
                onChange={(e) => setIsBold(e.target.checked)}
              />
              <span className="ml-2 font-bold">Bold</span>
            </label>
            <label className="flex items-center text-[#4B49AC]">
              <input
                type="checkbox"
                className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
                checked={isItalic}
                onChange={(e) => setIsItalic(e.target.checked)}
              />
              <span className="ml-2 italic">Italic</span>
            </label>
          </div>

          {/* Text Color */}
          <div className="flex items-center space-x-3">
            <label className="text-sm text-[#4B49AC]">Text Color:</label>
            <input
              type="color"
              className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
            <span className="text-sm text-gray-500">{textColor}</span>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6 p-3 bg-gray-50 rounded border">
        <label className="block text-sm font-medium text-[#4B49AC] mb-2">Preview</label>
        <div 
          className="text-sm"
          style={{
            fontWeight: isBold ? 'bold' : 'normal',
            fontStyle: isItalic ? 'italic' : 'normal',
            color: textColor
          }}
        >
          {label || "Field Name"}
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span className="ml-2">Mandatory (Required)</span>
        </label>
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
            checked={encrypt}
            onChange={(e) => setEncrypt(e.target.checked)}
          />
          <span className="ml-2">Encrypt Data</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors duration-300"
          onClick={handleCancel}
        >
          Cancel
        </button>
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

export default OrderTitleEditor;
