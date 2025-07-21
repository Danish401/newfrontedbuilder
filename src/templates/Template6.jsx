import React, { useState } from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaUser, FaCog, FaCheckCircle, FaArrowRight, FaArrowLeft, FaPaperPlane } from 'react-icons/fa';

function groupFieldsForSteps(fields) {
  const steps = [
    { label: 'Personal Info', icon: <FaUser />, fields: [] },
    { label: 'Preferences', icon: <FaCog />, fields: [] },
    { label: 'Review & Other', icon: <FaCheckCircle />, fields: [] },
  ];
  fields.forEach(field => {
    const type = field.type.toLowerCase();
    if (["name", "email", "phone", "address", "phonenumber"].some(t => type.includes(t)) || /name|email|phone|address/i.test(field.label)) {
      steps[0].fields.push(field);
    } else if (["dropdown", "optiongroup", "checkbox", "radiogroup", "multiplecheckbox"].some(t => type.includes(t))) {
      steps[1].fields.push(field);
    } else {
      steps[2].fields.push(field);
    }
  });
  return steps;
}

const Stepper = ({ steps, currentStep }) => (
  <div className="flex items-center justify-center mb-10">
    {steps.map((step, idx) => (
      <div key={step.label} className="flex items-center">
        <div className={`flex flex-col items-center ${idx < currentStep ? 'text-[#4B49AC]' : idx === currentStep ? 'text-[#7DA0FA]' : 'text-gray-400'}`}>
          <div className={`rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold border-4 ${idx === currentStep ? 'border-[#7DA0FA] bg-white' : idx < currentStep ? 'border-[#4B49AC] bg-white' : 'border-gray-300 bg-gray-100'}`}>{step.icon}</div>
          <span className="mt-2 text-sm font-semibold">{step.label}</span>
        </div>
        {idx < steps.length - 1 && <div className="w-10 h-1 bg-gradient-to-r from-[#4B49AC] to-[#7DA0FA] mx-2 rounded-full" />}
      </div>
    ))}
  </div>
);

const Template6 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  const steps = groupFieldsForSteps(fields);
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => setCurrentStep(s => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setCurrentStep(s => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#f9fafb] py-10">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow-2xl bg-white/90 border border-[#E5E7EB] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#4B49AC] mb-2 tracking-tight drop-shadow">{name || "Stepper Form"}</h2>
          <p className="text-lg text-gray-600">{info || "A guided, multi-step form with a modern progress bar."}</p>
        </div>
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="bg-white rounded-2xl shadow-xl border border-[#E5E7EB] p-8 mb-8">
          <DynamicFormRenderer
            fields={steps[currentStep].fields}
            formData={values}
            validationErrors={validationErrors}
            onFieldChange={onChange}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            showSubmit={false}
            readOnly={readOnly}
          />
        </div>
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-md shadow transition-all duration-300 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4B49AC]/30 ${isFirstStep ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaArrowLeft /> Back
          </button>
          {!isLastStep ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-md shadow transition-all duration-300 bg-gradient-to-r from-[#4B49AC] to-[#7DA0FA] text-white hover:from-[#7DA0FA] hover:to-[#4B49AC] focus:outline-none focus:ring-2 focus:ring-[#4B49AC]/30"
            >
              Next <FaArrowRight />
            </button>
          ) : !readOnly ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Template6; 