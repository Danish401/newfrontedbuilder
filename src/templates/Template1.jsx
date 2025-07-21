import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';

const Template1 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => (
  <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 border border-[#E5E7EB]">
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-[#4B49AC] mb-2">{name || "Modern Form"}</h2>
      <p className="text-gray-500">{info || "A clean, vertical layout with a colored header."}</p>
    </div>
    <DynamicFormRenderer
      fields={fields}
      formData={values}
      validationErrors={validationErrors}
      onFieldChange={onChange}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      showSubmit={!readOnly}
      readOnly={readOnly}
    />
  </div>
);

export default Template1; 