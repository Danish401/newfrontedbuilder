import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateDivider } from '../features/formSlice';

const DividerEditor = ({ field, onClose }) => {
  const dispatch = useDispatch();
  const [localField, setLocalField] = useState({
    label: field?.label || 'Divider',
    color: field?.color || '#000000',
    thickness: field?.thickness || 1,
    width: field?.width || '100%',
    height: field?.height || '1px',
    style: field?.style || 'solid',
    margin: field?.margin || '10px 0',
  });

  useEffect(() => {
    setLocalField({
      label: field?.label || 'Divider',
      color: field?.color || '#000000',
      thickness: field?.thickness || 1,
      width: field?.width || '100%',
      height: field?.height || '1px',
      style: field?.style || 'solid',
      margin: field?.margin || '10px 0',
    });
  }, [field]);

  const handleChange = (property, value) => {
    const updatedField = { ...localField, [property]: value };
    setLocalField(updatedField);
    dispatch(updateDivider({ id: field.id, ...updatedField }));
  };

  const styleOptions = [
    { value: 'solid', label: 'Solid' },
    { value: 'dashed', label: 'Dashed' },
    { value: 'dotted', label: 'Dotted' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Divider Settings</h3>
        
        {/* Preview */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2 text-gray-700">Preview</h4>
          <div style={{
            border: 'none',
            height: localField.height,
            width: localField.width,
            backgroundColor: localField.color,
            borderTop: `${localField.thickness}px ${localField.style} ${localField.color}`,
            margin: localField.margin,
          }} />
        </div>

        {/* Label */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Label
          </label>
          <input
            type="text"
            value={localField.label}
            onChange={(e) => handleChange('label', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Color */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={localField.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={localField.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Thickness */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Thickness: {localField.thickness}px
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={localField.thickness}
            onChange={(e) => handleChange('thickness', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Width */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Width
          </label>
          <input
            type="text"
            value={localField.width}
            onChange={(e) => handleChange('width', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="100%"
          />
        </div>

        {/* Height */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height
          </label>
          <input
            type="text"
            value={localField.height}
            onChange={(e) => handleChange('height', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1px"
          />
        </div>

        {/* Style */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Style
          </label>
          <select
            value={localField.style}
            onChange={(e) => handleChange('style', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {styleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Margin */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Margin
          </label>
          <input
            type="text"
            value={localField.margin}
            onChange={(e) => handleChange('margin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="10px 0"
          />
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DividerEditor; 