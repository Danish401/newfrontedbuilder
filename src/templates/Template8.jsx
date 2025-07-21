import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane } from 'react-icons/fa';

const Template8 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9fafb] py-10">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow bg-white border border-gray-200">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2 tracking-tight">{name || "Minimalist Form"}</h2>
          <p className="text-base text-gray-400">{info || "Elegant, simple, and focused. Just the essentials."}</p>
        </div>
        <div className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <DynamicFormRenderer
                fields={fields}
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
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-8 py-3 rounded-lg font-semibold text-base shadow-sm border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <FaPaperPlane className="text-lg" />
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400 mr-2"></span>
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
    </div>
  );
};

export default Template8; 