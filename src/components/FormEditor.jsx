



import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const FormEditor = () => {
  const { formId } = useParams();
  const savedForms = useSelector((state) => state.form.savedForms);
  const form = savedForms.find((form) => form.id === formId);

  useEffect(() => {
    if (form) {
      console.log('Form Data:', form);
    }
  }, [form]);

  if (!form) {
    return <div>Form not found</div>;
  }

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <>
            <strong>{field.label}</strong>
            <p>{field.placeholder}</p>
            {field.required && <p className="text-red-500">Required</p>}
          </>
        );
      case 'date':
        return (
          <>
            <strong>{field.label}</strong>
            <p>{field.placeholder}</p>
            {field.required && <p className="text-red-500">Required</p>}
          </>
        );
      case 'dropdown':
        return (
          <>
            <strong>{field.label}</strong>
            <ul>
              {field.options.map((option) => (
                <li key={option.id}>{option.value}</li>
              ))}
            </ul>
            {field.required && <p className="text-red-500">Required</p>}
          </>
        );
      case 'optionGroup':
        return (
          <>
            <strong>{field.label}</strong>
            <ul>
              {field.options.map((option) => (
                <li key={option.id}>{option.value}</li>
              ))}
            </ul>
            {field.required && <p className="text-red-500">Required</p>}
          </>
        );
      case 'file':
        return (
          <>
            <strong>{field.label}</strong>
            <p>{field.value ? 'File uploaded' : 'No file uploaded'}</p>
            {field.required && <p className="text-red-500">Required</p>}
          </>
        );
      case 'secretText':
        return (
          <>
            <strong>{field.label}</strong>
            <p>{field.value ? '****' : 'No value'}</p>
            {field.required && <p className="text-red-500">Required</p>}
          </>
        );
      default:
        return <div>Unknown field type</div>;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Form Details</h1>
      <div>
        <h2 className="text-xl font-semibold">Form ID: {form.id}</h2>
        <h3 className="text-lg font-semibold mt-4">Order Form</h3>
        {form.fields.map((field) => (
          <div key={field.id} className="mb-4 p-4 border rounded-lg">
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormEditor;
