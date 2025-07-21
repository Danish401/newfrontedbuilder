import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane } from 'react-icons/fa';

const Template5 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#f9fafb] py-10">
      <div className="max-w-4xl w-full flex rounded-3xl shadow-2xl bg-white/90 border border-[#E5E7EB] backdrop-blur-md overflow-hidden">
        {/* Vertical Accent Bar */}
        <div className="hidden md:block w-3 bg-gradient-to-b from-[#4B49AC] to-[#7DA0FA]" />
        {/* On mobile, show bar at top */}
        <div className="md:hidden w-full h-2 bg-gradient-to-r from-[#4B49AC] to-[#7DA0FA] absolute top-0 left-0 rounded-t-3xl" />
        <div className="flex-1 p-10">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold text-[#4B49AC] mb-2 tracking-tight drop-shadow">{name || "Vertical Accent Form"}</h2>
            <p className="text-lg text-gray-600">{info || "A bold vertical bar and grouped cards for a professional, modern look."}</p>
          </div>
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-8">
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
            {!readOnly && (
              <div className="flex justify-center pt-8">
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
      </div>
    </div>
  );
};

export default Template5; 