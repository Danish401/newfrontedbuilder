import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';
import Template5 from '../templates/Template5';
import Template6 from '../templates/Template6';
import Template7 from '../templates/Template7';
import Template8 from '../templates/Template8';
import Template9 from '../templates/Template9';
import Template10 from '../templates/Template10';
import InvoiceTemplate from '../templates/InvoiceTemplate';
import CompanyProfileTemplate from '../templates/CompanyProfileTemplate';
import EventRegistrationTemplate from '../templates/EventRegistrationTemplate';
import JobApplicationTemplate from '../templates/JobApplicationTemplate';
import FeedbackTemplate from '../templates/FeedbackTemplate';
import PurchaseOrderTemplate from '../templates/PurchaseOrderTemplate';
import AppointmentBookingTemplate from '../templates/AppointmentBookingTemplate';
import CustomLayoutTemplate from '../templates/CustomLayoutTemplate';

const templateComponents = [
  Template1,
  Template2,
  Template3,
  Template4,
  Template5,
  Template6,
  Template7,
  Template8,
  Template9,
  Template10,
  InvoiceTemplate,
  CompanyProfileTemplate,
  EventRegistrationTemplate,
  JobApplicationTemplate,
  FeedbackTemplate,
  PurchaseOrderTemplate,
  AppointmentBookingTemplate,
  CustomLayoutTemplate
];

const templateNames = [
  "Modern",
  "Card",
  "Minimal",
  "Dark Mode",
  "Vertical Bar",
  "Pastel Banner",
  "Two-Column",
  "Stepper",
  "Floating Label",
  "Glassmorphism",
  "Invoice (Business)",
  "Company Profile (Business)",
  "Event Registration (Business)",
  "Job Application (Business)",
  "Feedback/Survey (Business)",
  "Purchase Order (Business)",
  "Appointment Booking (Business)",
  "Custom Layout (User)"
];
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const ForceTemplateSubmission = ({ templateNumber }) => {
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
        submittedAt: new Date().toISOString(),
        templateInfo: {
          templateNumber,
          templateName: templateNames[(templateNumber || 1) - 1] || 'Unknown'
        }
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

  const TemplateComponent = templateComponents[(templateNumber || 1) - 1] || Template1;

  return (
    <TemplateComponent
      fields={form.fields}
      values={formData}
      validationErrors={validationErrors}
      onChange={handleFieldChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      readOnly={false}
      name={form.name}
      info={form.info}
    />
  );
};

export default ForceTemplateSubmission; 