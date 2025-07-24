import React, { useState } from 'react';
import Template2 from '../templates/Template2';
import axios from 'axios';

// Example fields for Template2 (replace with actual fields or fetch from backend if needed)
const template2Fields = [
  { id: 'name', label: 'Name', type: 'text', required: true },
  { id: 'email', label: 'Email', type: 'email', required: true },
  // Removed 'feedback' and other written text fields
  // Add more fields as per your Template2 definition
];
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const PublicTemplate2Form = () => {
  const [values, setValues] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (fieldId, value) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
  };

  const validate = () => {
    const errors = {};
    template2Fields.forEach((field) => {
      if (field.required && !values[field.id]) {
        errors[field.id] = 'This field is required';
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const errors = validate();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    try {
      // Replace with your backend endpoint
      await axios.post(`${BACKEND_URL}/api/forms/template2/submit`, values);
      setSubmitted(true);
    } catch (error) {
      setValidationErrors({ form: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#f9fafb]">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Thank you!</h2>
          <p className="text-lg text-gray-700">Your response has been submitted.</p>
        </div>
      </div>
    );
  }

  return (
    <Template2
      fields={template2Fields}
      values={values}
      validationErrors={validationErrors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      readOnly={false}
    />
  );
};

export default PublicTemplate2Form; 