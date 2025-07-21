import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane } from 'react-icons/fa';

const Template4 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232946] via-[#1a1a2e] to-[#0f3460] py-10">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow-2xl bg-[#232946]/80 border border-[#4B49AC] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#CBCDFF] mb-2 tracking-tight drop-shadow">{name || "Dark Mode Glass Form"}</h2>
          <p className="text-lg text-[#a0a0c0]">{info || "A modern, glassy form with neon accents and glowing borders."}</p>
        </div>
        <div className="space-y-8">
          <div className="bg-[#181824]/80 rounded-2xl shadow-xl border-2 border-[#4B49AC] p-8 transition-transform duration-200 hover:scale-[1.01] hover:shadow-2xl backdrop-blur-md">
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
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#4B49AC] to-[#7DA0FA] text-white hover:from-[#7DA0FA] hover:to-[#4B49AC] focus:outline-none focus:ring-4 focus:ring-[#4B49AC]/50 border-2 border-[#CBCDFF] ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <FaPaperPlane className="text-xl text-[#CBCDFF] drop-shadow-glow" />
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
  );
};

export default Template4; 