import React, { useState } from 'react';
import FormField from './FormField';
import CustomizedSlider from './CustomizedSlider';
import CustomizedRating from './CustomizedRating';
import PageBreak from './PageBreak';

const splitFieldsByPage = (fields) => {
  const pages = [[]];
  fields.forEach(field => {
    if (field.type === 'pageBreak') {
      pages.push([]);
    } else {
      pages[pages.length - 1].push(field);
    }
  });
  return pages;
};

const DynamicFormRenderer = ({
  fields = [],
  formData = {},
  validationErrors = {},
  onFieldChange,
  onSubmit,
  isSubmitting = false,
  showSubmit = true,
  readOnly = false,
  name,
  info,
  forceSinglePage = false,
}) => {
  // If forceSinglePage, ignore pageBreaks and render all fields on one page
  const pages = forceSinglePage
    ? [fields.filter(f => f.type !== 'pageBreak')]
    : splitFieldsByPage(fields);
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {pages.map((fieldsOnPage, idx) => (
        <div key={idx} className="page-section" style={{
          margin: '12px 0',
          padding: '12px',
          border: '1px solid #eee',
          borderRadius: '12px',
          background: '#fff',
          boxShadow: '0 2px 8px #eee',
          minHeight: 'unset',
          height: 'unset',
          position: 'relative',
          overflow: 'hidden',
          pageBreakAfter: 'auto',
        }}>
          {idx === 0 && (
            <div className="mb-4 text-center">
              {name && <h2 className="text-3xl font-bold text-[#4B49AC] mb-2">{name}</h2>}
              {info && <p className="text-gray-500">{info}</p>}
            </div>
          )}
          {fieldsOnPage.map((field) => {
            if (field.type === 'pageBreak') return null;
            const fieldWithData = {
              ...field,
              value: formData[field.id],
              error: validationErrors[field.id],
            };

            // Patch: Always render fileUpload as image in read-only/submission mode
            if (field.type === 'fileUpload' && readOnly) {
              if (fieldWithData.value) {
                return (
                  <div key={field.id} className="mb-3">
                    <label className="block text-sm font-medium text-[#4B49AC] mb-2">{field.label}</label>
                    <img 
                      src={fieldWithData.value} 
                      alt="Uploaded" 
                      style={{ maxWidth: 200, maxHeight: 200, borderRadius: 8, border: '1px solid #eee', display: 'block' }}
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                    <div className="text-xs text-green-600 mt-1" style={{ display: 'none' }}>
                      <a href={fieldWithData.value} target="_blank" rel="noopener noreferrer">View File</a>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={field.id} className="mb-3">
                    <label className="block text-sm font-medium text-[#4B49AC] mb-2">{field.label}</label>
                    <div className="text-xs text-gray-400 mt-1">No file uploaded</div>
                  </div>
                );
              }
            }

            // Custom rendering for optionGroup (radio group)
            if (field.type === 'optionGroup' || field.type === 'Radio-group') {
              return (
                <div key={field.id} className="mb-3">
                  <label className="block text-sm font-medium text-[#4B49AC] mb-2">{field.label}</label>
                  <div className="flex flex-col space-y-2">
                    {field.options && field.options.map(option => (
                      <label key={option.id} className={`flex items-center px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${formData[field.id] === option.value ? 'bg-[#e2ddfe] font-bold text-[#4B49AC]' : 'hover:bg-gray-100'}` }>
                        <input
                          type="radio"
                          name={field.id}
                          value={option.value}
                          checked={formData[field.id] === option.value}
                          onChange={() => onFieldChange(field.id, option.value)}
                          className="form-radio text-[#4B49AC] focus:ring-[#4B49AC] mr-2"
                        />
                        <span>{option.value}</span>
                      </label>
                    ))}
                  </div>
                  {validationErrors[field.id] && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {validationErrors[field.id]}
                    </div>
                  )}
                </div>
              );
            }

            // Custom rendering for MultipleCheckbox (multi-checkbox group)
            if (field.type === 'MultipleCheckbox') {
              const selectedValues = Array.isArray(formData[field.id]) ? formData[field.id] : [];
              const handleCheckboxChange = (optionValue) => {
                let newValues = [...selectedValues];
                if (newValues.includes(optionValue)) {
                  newValues = newValues.filter(v => v !== optionValue);
                } else {
                  newValues.push(optionValue);
                }
                onFieldChange(field.id, newValues);
              };
              return (
                <div key={field.id} className="mb-3">
                  <label className="block text-sm font-medium text-[#4B49AC] mb-2">{field.label}</label>
                  <div className="flex flex-wrap gap-4">
                    {field.options && field.options.map(option => (
                      <label key={option.id} className="flex items-center">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={selectedValues.includes(option.value)}
                          onChange={() => handleCheckboxChange(option.value)}
                          className="form-checkbox text-[#4B49AC] focus:ring-[#4B49AC]"
                        />
                        <span className="ml-2">{option.value}</span>
                      </label>
                    ))}
                  </div>
                  {validationErrors[field.id] && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {validationErrors[field.id]}
                    </div>
                  )}
                </div>
              );
            }

            // Custom rendering for slider field
            if (field.type === 'slider') {
              return (
                <div key={field.id} className="mb-3">
                  <label className="block text-sm font-medium text-[#4B49AC] mb-2">{field.label}</label>
                  <CustomizedSlider field={{ ...field, value: formData[field.id] }} handleFieldChange={(id, value) => onFieldChange(field.id, value)} />
                  {validationErrors[field.id] && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {validationErrors[field.id]}
                    </div>
                  )}
                </div>
              );
            }

            // Custom rendering for rating field
            if (field.type === 'rating') {
              return (
                <div key={field.id} className="mb-3">
                  <CustomizedRating
                    field={fieldWithData}
                    onChange={value => onFieldChange(field.id, value)}
                  />
                  {validationErrors[field.id] && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {validationErrors[field.id]}
                    </div>
                  )}
                </div>
              );
            }

            // Default rendering for other fields
            return (
              <div key={field.id} className="mb-3">
                <FormField
                  field={fieldWithData}
                  handleFieldChange={onFieldChange}
                  showLabel={true}
                  submissionMode={true}
                  readOnly={readOnly}
                />
                {validationErrors[field.id] && (
                  <div className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠️</span>
                    {validationErrors[field.id]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
      {showSubmit && !readOnly && (
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-colors duration-300 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#4B49AC] hover:bg-[#7DA0FA]'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Submit Form'
            )}
          </button>
        </div>
      )}
    </form>
  );
};

export default DynamicFormRenderer; 