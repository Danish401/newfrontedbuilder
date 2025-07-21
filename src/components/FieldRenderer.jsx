// FieldRenderer.js
import React from 'react';

const FieldRenderer = ({ field, onFieldChange, error }) => {
  const commonLabel = (
    <label className="block text-sm font-medium text-[#4B49AC] mb-1">
      {field.label || field.name}
      {field.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  switch (field.type) {
    case 'text':
    case 'number':
    case 'email':
    case 'password':
    case 'date':
      return (
        <div>
          {commonLabel}
          <input
            type={field.type}
            className="w-full border-2 border-[#4B49AC] rounded-md px-3 py-2 focus:border-[#7DA0FA] bg-[#F3F4F6] text-gray-700"
            value={field.value || ''}
            placeholder={field.placeholder || ''}
            required={field.required}
            onChange={e => onFieldChange(field.id, e.target.value)}
          />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    case 'textarea':
      return (
        <div>
          {commonLabel}
          <textarea
            className="w-full border-2 border-[#4B49AC] rounded-md px-3 py-2 focus:border-[#7DA0FA] bg-[#F3F4F6] text-gray-700"
            value={field.value || ''}
            placeholder={field.placeholder || ''}
            required={field.required}
            onChange={e => onFieldChange(field.id, e.target.value)}
            rows={field.rows || 3}
          />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    case 'dropdown':
    case 'optionGroup':
      return (
        <div>
          {commonLabel}
          <select
            className="w-full border-2 border-[#4B49AC] rounded-md px-3 py-2 focus:border-[#7DA0FA] bg-[#F3F4F6] text-gray-700"
            value={field.value || ''}
            required={field.required}
            onChange={e => onFieldChange(field.id, e.target.value)}
          >
            <option value="" disabled>{field.placeholder || 'Select an option'}</option>
            {field.options && field.options.map(option => (
              <option key={option.id || option.value} value={option.value}>{option.label || option.value}</option>
            ))}
          </select>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    case 'checkbox':
      return (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={!!field.value}
            onChange={e => onFieldChange(field.id, e.target.checked)}
            className="form-checkbox text-[#4B49AC] border-2 rounded-md focus:ring-[#7DA0FA]"
            id={field.id}
          />
          <label htmlFor={field.id} className="text-sm text-[#4B49AC]">{field.label || field.name}{field.required && <span className="text-red-500 ml-1">*</span>}</label>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    case 'radio':
    case 'Radio-group':
      return (
        <div>
          {commonLabel}
          <div className="flex flex-col space-y-1">
            {field.options && field.options.map(option => (
              <label key={option.id || option.value} className="flex items-center">
                <input
                  type="radio"
                  name={field.id}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={e => onFieldChange(field.id, option.value)}
                  className="form-radio text-[#4B49AC] focus:ring-[#4B49AC]"
                />
                <span className="ml-2">{option.label || option.value}</span>
              </label>
            ))}
          </div>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    case 'MultipleCheckbox':
      return (
        <div>
          {commonLabel}
          <div className="flex flex-col space-y-1">
            {field.options && field.options.map(option => {
              let selectedValues = Array.isArray(field.value) ? field.value : [];
              return (
                <label key={option.id || option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={e => {
                      let newValues = [...selectedValues];
                      if (e.target.checked) {
                        newValues.push(option.value);
                      } else {
                        newValues = newValues.filter(v => v !== option.value);
                      }
                      onFieldChange(field.id, newValues);
                    }}
                    className="form-checkbox text-[#4B49AC] focus:ring-[#4B49AC]"
                  />
                  <span className="ml-2">{option.label || option.value}</span>
                </label>
              );
            })}
          </div>
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    case 'fileUpload':
      return (
        <div>
          {commonLabel}
          <input
            type="file"
            className="w-full border-2 border-[#4B49AC] rounded-md px-3 py-2 focus:border-[#7DA0FA] bg-[#F3F4F6] text-gray-700"
            onChange={e => onFieldChange(field.id, e.target.files[0])}
            required={field.required}
          />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
    default:
      return (
        <div>
          {commonLabel}
          <input
            type="text"
            className="w-full border-2 border-[#4B49AC] rounded-md px-3 py-2 focus:border-[#7DA0FA] bg-[#F3F4F6] text-gray-700"
            value={field.value || ''}
            placeholder={field.placeholder || ''}
            required={field.required}
            onChange={e => onFieldChange(field.id, e.target.value)}
          />
          {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
        </div>
      );
  }
};

export default FieldRenderer;
