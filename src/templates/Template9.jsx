import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaPaperPlane, FaRegStickyNote } from 'react-icons/fa';

const Template9 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f5ee] py-10">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow-2xl bg-[#fffdf7] border border-[#e2d9c3]">
        <div className="mb-10 text-center">
          <div className="flex justify-center mb-2">
            <FaRegStickyNote className="text-4xl text-[#e2d9c3] drop-shadow" />
          </div>
          <h2 className="text-3xl font-bold text-[#bfa76a] mb-2 tracking-tight" style={{ fontFamily: 'Caveat, cursive' }}>{name || "Paper Form"}</h2>
          <p className="text-base text-[#bfa76a]">{info || "A playful, paper-inspired form with torn edges and hand-drawn style."}</p>
        </div>
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-6">
              {fields.map(field => (
                <div
                  key={field.id}
                  className="bg-white rounded-2xl shadow border border-[#e2d9c3] p-6 relative overflow-hidden"
                  style={{
                    borderBottom: '6px dashed #e2d9c3',
                    boxShadow: '0 4px 16px 0 #e2d9c355',
                  }}
                >
                  {/* Torn edge SVG at the bottom */}
                  <svg
                    className="absolute left-0 bottom-0 w-full h-3"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                    style={{ zIndex: 1 }}
                  >
                    <polygon fill="#fffdf7" points="0,10 100,0 100,10" />
                  </svg>
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
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#bfa76a] to-[#e2d9c3] text-white hover:from-[#e2d9c3] hover:to-[#bfa76a] focus:outline-none focus:ring-4 focus:ring-[#e2d9c3]/30 ${
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

export default Template9; 