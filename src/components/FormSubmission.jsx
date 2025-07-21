// FormSubmission.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { validateForm, validateField, getFieldValidationState } from '../lib/utils';
import FormField from './FormField';
import CustomizedSlider from './CustomizedSlider';
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
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

const FormSubmission = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const responseContentRef = useRef(null);

  // Load form data
  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`);
        setForm(response.data);
        
        // Initialize form data with empty values
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
          } else if (field.type === 'spreadsheet') {
            // Initialize with the correct number of rows/columns
            let rows = field.rows && field.rows.length > 0
              ? field.rows.map(row => ({ data: [...row.data] }))
              : [ { data: field.columns ? field.columns.map(() => '') : [] } ];
            initialData[field.id] = rows;
          } else if (field.type === 'dropzone') {
            initialData[field.id] = { files: [] };
          } else {
            initialData[field.id] = '';
          }
        });
        setFormData(initialData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading form:', error);
        toast.error('Error loading form');
        setIsLoading(false);
      }
    };

    if (formId) {
      loadForm();
    }
  }, [formId]);

  // Update form data when field changes
  const handleFieldChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Clear validation error for this field
    setValidationErrors(prev => ({
      ...prev,
      [fieldId]: null
    }));
  };

  // Validate single field
  const validateSingleField = (field) => {
    const fieldWithValue = {
      ...field,
      value: formData[field.id]
    };
    
    // Handle special field types
    if (field.type === 'address') {
      const addressData = formData[field.id] || {};
      fieldWithValue.addressLine1 = addressData.addressLine1;
      fieldWithValue.addressLine2 = addressData.addressLine2;
      fieldWithValue.city = addressData.city;
      fieldWithValue.state = addressData.state;
      fieldWithValue.postCode = addressData.postCode;
      fieldWithValue.country = addressData.country;
    } else if (field.type === 'spreadsheet') {
      const spreadsheetData = formData[field.id] || {};
      fieldWithValue.rows = spreadsheetData.rows;
    } else if (field.type === 'dropzone') {
      const dropzoneData = formData[field.id] || {};
      fieldWithValue.files = dropzoneData.files;
    }

    return validateField(fieldWithValue);
  };

  // Validate all fields
  const validateAllFields = () => {
    if (!form) return { isValid: false, errors: [] };

    const errors = {};
    let isValid = true;

    form.fields.forEach(field => {
      const validation = validateSingleField(field);
      if (!validation.isValid) {
        errors[field.id] = validation.error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return { isValid, errors };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = validateAllFields();
    
    if (!validation.isValid) {
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format answers for backend
      const answers = form.fields.map(field => {
        let value = formData[field.id];
        
        // Handle special field types
        if (field.type === 'address') {
          value = JSON.stringify(formData[field.id] || {});
        } else if (field.type === 'spreadsheet') {
          value = JSON.stringify(formData[field.id] || []);
        } else if (field.type === 'dropzone') {
          const dropzoneData = formData[field.id] || {};
          value = JSON.stringify(dropzoneData.files || []);
        }
        
        return {
          fieldId: field.id,
          fieldLabel: field.label,
          value: value || ''
        };
      });

      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/submit-form/${formId}`, {
        formId,
        answers,
        submittedAt: new Date().toISOString()
      });

      toast.success('Form submitted successfully!');
      
      // Clear form data
      const initialData = {};
      form.fields.forEach(field => {
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
        } else if (field.type === 'spreadsheet') {
          let rows = field.rows && field.rows.length > 0
            ? field.rows.map(row => ({ data: [...row.data] }))
            : [ { data: field.columns ? field.columns.map(() => '') : [] } ];
          initialData[field.id] = rows;
        } else if (field.type === 'dropzone') {
          initialData[field.id] = { files: [] };
        } else {
          initialData[field.id] = '';
        }
      });
      setFormData(initialData);
      setValidationErrors({});
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadResponsePDF = async (response) => {
    if (!responseContentRef.current) return;
    // Use html2canvas to capture the DOM node as an image
    const canvas = await html2canvas(responseContentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4'
    });

    // Calculate width/height to fit A4
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`response-${response._id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4B49AC] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Form Not Found</h2>
          <p className="text-gray-600">The form you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  // Pick the correct template component
  const TemplateComponent = templateComponents[(form.templateId || 1) - 1] || Template1;

  const shareLink = form.templateId === 2
    ? `/form/submit/templateid/${formId}`
    : `/form/submit/${formId}`;

  return (
    <div ref={responseContentRef}>
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
    </div>
  );
};

export default FormSubmission;
