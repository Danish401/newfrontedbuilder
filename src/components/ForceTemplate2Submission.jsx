import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Template2 from '../templates/Template2';
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const ForceTemplate2Submission = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [expired, setExpired] = useState(false);
  const [expireMsg, setExpireMsg] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/forms/public/${formId}`);
        setForm(response.data);
        // Initialize form data
        const initialData = {};
        response.data.fields.forEach(field => {
          if (field.type === 'checkbox') {
            initialData[field.id] = false;
          } else if (field.type === 'address') {
            initialData[field.id] = {
              addressLine1: '',
              addressLine2: '',
              city: '',
              state: '',
              postCode: '',
              country: ''
            };
          } else {
            initialData[field.id] = '';
          }
        });
        setFormData(initialData);
        setExpired(false);
        setExpireMsg("");
      } catch (err) {
        if (err.response && err.response.status === 403 && err.response.data && err.response.data.message) {
          setExpired(true);
          setExpireMsg(err.response.data.message);
        } else {
          setForm(null);
        }
      }
    };
    fetchForm();
  }, [formId]);

  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    setValidationErrors(prev => ({ ...prev, [fieldId]: null }));
  };

  const validate = () => {
    const errors = {};
    if (!form) return errors;
    form.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
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
      await axios.post(`${BACKEND_URL}/api/submit-form/${formId}`, {
        formId,
        answers: Object.entries(formData).map(([fieldId, value]) => ({ fieldId, value })),
        submittedAt: new Date().toISOString()
      });
      setSubmitted(true);
    } catch (err) {
      setValidationErrors({ form: 'Submission failed. Please try again.' });
    }
    setIsSubmitting(false);
  };

  if (expired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0e7ff] via-[#f3f4f6] to-[#f9fafb]">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Form Expired</h2>
          <p className="text-lg text-gray-700">{expireMsg || 'This form has expired. Please contact the admin to get access.'}</p>
        </div>
      </div>
    );
  }

  if (!form) return <div>Loading...</div>;
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
      fields={form.fields}
      values={formData}
      validationErrors={validationErrors}
      onChange={handleFieldChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      readOnly={false}
    />
  );
};

export default ForceTemplate2Submission; 