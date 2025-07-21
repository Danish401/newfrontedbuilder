import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane, FaRocket } from 'react-icons/fa';

const Template10 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#00c6ff] py-10 animate-gradient-x">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow-2xl bg-[#101c2c]/90 border-4 border-[#00c6ff] backdrop-blur-md">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-2">
            <FaRocket className="text-4xl text-[#00c6ff] animate-bounce drop-shadow" />
          </div>
          <h2 className="text-4xl font-extrabold text-[#00c6ff] mb-2 tracking-widest drop-shadow-lg uppercase">{name || "Futuristic Form"}</h2>
          <p className="text-lg text-[#b2eaff]">{info || "Bold gradients, glowing borders, and animated transitions for a high-tech look."}</p>
        </div>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-6">
              {fields.map(field => (
                <div
                  key={field.id}
                  className="bg-[#162447] rounded-2xl shadow-xl border-2 border-[#00c6ff] p-6 transition-transform duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in"
                  style={{ boxShadow: '0 0 24px 0 #00c6ff55' }}
                >
                  <DynamicFormRenderer
                    fields={[field]}
                    formData={values}
                    validationErrors={validationErrors}
                    onFieldChange={onChange}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    showSubmit={false}
                    readOnly={readOnly}
                  />
                </div>
              ))}
            </div>
          </div>
          {!readOnly && (
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#00c6ff] to-[#2c5364] text-white hover:from-[#2c5364] hover:to-[#00c6ff] focus:outline-none focus:ring-4 focus:ring-[#00c6ff]/30 uppercase tracking-widest ${
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
  );
};

export default Template10; 