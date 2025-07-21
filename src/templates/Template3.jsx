import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane } from 'react-icons/fa';

function splitFields(fields) {
  const left = [];
  const right = [];
  fields.forEach((field, i) => {
    (i % 2 === 0 ? left : right).push(field);
  });
  return [left, right];
}

const Template3 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  const [leftFields, rightFields] = splitFields(fields);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#f9fafb] py-10">
      <div className="max-w-4xl w-full p-8 rounded-3xl shadow-2xl bg-white/80 border border-[#E5E7EB] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#4B49AC] mb-2 tracking-tight drop-shadow">{name || "Two-Column Form"}</h2>
          <p className="text-lg text-gray-600">{info || "Fields are distributed between two columns for a professional, efficient look."}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-8">
            <DynamicFormRenderer
              fields={leftFields}
              formData={values}
              validationErrors={validationErrors}
              onFieldChange={onChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              showSubmit={false}
              readOnly={readOnly}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-8">
            <DynamicFormRenderer
              fields={rightFields}
              formData={values}
              validationErrors={validationErrors}
              onFieldChange={onChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              showSubmit={false}
              readOnly={readOnly}
            />
          </div>
        </div>
        {!readOnly && (
          <div className="flex justify-center pt-10">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#4B49AC] to-[#7DA0FA] text-white hover:from-[#7DA0FA] hover:to-[#4B49AC] focus:outline-none focus:ring-4 focus:ring-[#4B49AC]/30 ${
                isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              <FaPaperPlane className="text-xl" />
              {isSubmitting ? (
                <span className="flex items-center">
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                  Submitting...
                </span>
              ) : (
                'Submit Form'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template3; 