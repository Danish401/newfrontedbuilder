// working 


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { MdPictureAsPdf } from 'react-icons/md';
// import { toast ,ToastContainer} from 'react-toastify';
// import { BarLoader } from 'react-spinners';
// import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles
// const ViewForm = () => {
//   const { formId } = useParams();
//   const form = useSelector((state) =>
//     state.form.savedForms.find((form) => form.id === formId)
//   );

//   const [isLoading, setIsLoading] = useState(false); // State to manage loading

//   const downloadPDF = () => {
//     setIsLoading(true); // Show loader

//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text('Form Name: ' + form.name, 10, 10);
//     doc.setFontSize(12);
//     doc.text('Form Info: ' + form.info, 10, 20);
//     doc.text('', 10, 30);

//     const columns = [
//       { header: 'Field Label', dataKey: 'label' },
//       { header: 'Value', dataKey: 'value' },
//     ];

//     const rows = form.fields.map((field) => ({
//       label: field.label,
//       value: field.type === 'textEditor' ? field.value.replace(/(<([^>]+)>)/gi, '') : field.value, // Remove HTML tags for PDF
//     }));

//     autoTable(doc, {
//       columns: columns,
//       body: rows,
//       startY: 40,
//       theme: 'striped',
//       styles: { 
//         cellPadding: 3,
//         fontSize: 10,
//         overflow: 'linebreak',
//       },
//       headStyles: {
//         fillColor: [75, 73, 172],
//         textColor: [255, 255, 255],
//       },
//     });

//     // Simulate a download delay for the loader
//     setTimeout(() => {
//       doc.save(`${form.name}.pdf`);
//       setIsLoading(false); // Hide loader

//       // Show success toast
//       toast.success("Form downloaded successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }, 2000); // Simulating a 2-second delay for the download
//   };

//   return (
//     <div className="p-6 bg-[#F9F9F9] min-h-screen relative">
//       <h2 className="text-3xl font-bold mb-6 text-[#4B49AC]">View Form</h2>
//       {form ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-[#E5E7EB]">
//           <h3 className="text-2xl font-semibold mb-4 text-[#4B49AC]">{form.name}</h3>
//           <p className="text-gray-600 mb-6">{form.info}</p>
//           <table className="min-w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg">
//             <thead>
//               <tr className="bg-[#4B49AC] text-white">
//                 <th className="py-3 px-6 text-left border-b border-[#E5E7EB]">Field Label</th>
//                 <th className="py-3 px-6 text-left border-b border-[#E5E7EB]">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {form.fields.map((field, index) => (
//                 <tr key={field.id || index} className="border-b border-[#E5E7EB] hover:bg-[#F3F4F6]">
//                   <td className="py-4 px-6 font-medium text-[#4B49AC]">{field.label}</td>
//                   <td className="py-4 px-6">
//                     {field.type === 'textEditor' ? (
//                       <div
//                         className="border-2 border-[#4B49AC] rounded-lg p-2 w-full bg-[#F3F4F6] text-gray-600 font-serif"
//                         dangerouslySetInnerHTML={{ __html: field.value }} // Displaying HTML content from the text editor
//                       />
//                     ) : (
//                       <input
//                         type={field.type}
//                         value={field.value}
//                         disabled
//                         className="border-2 border-[#4B49AC] rounded-lg p-2 w-full bg-[#F3F4F6] text-gray-600 font-serif focus:outline-none focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-600">Form not found.</p>
//       )}

//       {form && (
//         <div className="absolute bottom-4 right-4">
//           <button
//             onClick={downloadPDF}
//             className="bg-[#4B49AC] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#7DA0FA] transition-colors duration-300 ease-in-out"
//           >
//             <MdPictureAsPdf className="mr-2" />
//             Download PDF
//           </button>
//         </div>
//       )}

//       {isLoading && (
//         <div className="absolute bottom-4 right-4">
//           <BarLoader color="#36D7B7" width={100} /> {/* Customize loader color and width */}
//         </div>
//       )}
//         <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default ViewForm;



// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { jsPDF } from 'jspdf';
// import autoTable from 'jspdf-autotable';
// import { MdPictureAsPdf } from 'react-icons/md';
// import { toast, ToastContainer } from 'react-toastify';
// import { BarLoader } from 'react-spinners';
// import 'react-toastify/dist/ReactToastify.css'; // Import the toast styles

// const ViewForm = () => {
//   const { formId } = useParams();
//   const form = useSelector((state) =>
//     state.form.savedForms.find((form) => form.id === formId)
//   );

//   const [isLoading, setIsLoading] = useState(false); // State to manage loading

//   const downloadPDF = async () => {
//     setIsLoading(true); // Show loader

//     const doc = new jsPDF();

//     // Add the form name and info
//     doc.setFontSize(16);
//     doc.text('Form Name: ' + form.name, 10, 10);
//     doc.setFontSize(12);
//     doc.text('Form Info: ' + form.info, 10, 20);
//     doc.text('', 10, 30);

//     // Add image from the first field if it exists
//     const imageField = form.fields.find(field => field.type === 'fileUpload');
//     if (imageField && imageField.value) {
//       const img = new Image();
//       img.src = imageField.value; // Use the value from the field
//       img.onload = () => {
//         // Calculate width and height in mm for a passport photo size (2 inches)
//         const width = 51; // width in mm
//         const height = 51; // height in mm
//         doc.addImage(img, 'JPEG', 10, 40, width, height); // Add image at (10, 40) with width and height for passport size
//         addTableToPDF(doc, form.fields); // Call function to add table after image is loaded
//         savePDF(doc);
//       };
//     } else {
//       addTableToPDF(doc, form.fields); // Call function to add table if no image
//       savePDF(doc);
//     }
//   };

//   const addTableToPDF = (doc, fields) => {
//     const pages = splitFieldsByPage(fields);
//     pages.forEach((fieldsOnPage, idx) => {
//       if (idx > 0) doc.addPage();
//       const rows = fieldsOnPage.map(field => ({
//         label: field.label,
//         value: field.type === 'textEditor' ? field.value.replace(/(<([^>]+)>)/gi, '') : field.value,
//       }));
//       if (rows.length > 0) {
//         autoTable(doc, {
//           columns: [
//             { header: 'Field Label', dataKey: 'label' },
//             { header: 'Value', dataKey: 'value' },
//           ],
//           body: rows,
//           startY: 40,
//           theme: 'striped',
//           styles: { cellPadding: 3, fontSize: 10, overflow: 'linebreak' },
//           headStyles: { fillColor: [75, 73, 172], textColor: [255, 255, 255] },
//         });
//       }
//     });
//   };

//   const savePDF = (doc) => {
//     setTimeout(() => {
//       doc.save(`${form.name}.pdf`);
//       setIsLoading(false); // Hide loader

//       // Show success toast
//       toast.success("Form downloaded successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }, 2000); // Simulating a 2-second delay for the download
//   };

//   return (
//     <div className="p-6 bg-[#F9F9F9] min-h-screen relative">
//       <h2 className="text-3xl font-bold mb-6 text-[#4B49AC]">View Form</h2>
//       {form ? (
//         <div className="bg-white p-6 rounded-lg shadow-lg border border-[#E5E7EB]">
//           <h3 className="text-2xl font-semibold mb-4 text-[#4B49AC]">{form.name}</h3>
//           <p className="text-gray-600 mb-6">{form.info}</p>
//           <img src={form.fields[0]?.value} alt="Uploaded" className="mb-4" /> {/* Display uploaded image */}
//           <table className="min-w-full bg-white border border-[#E5E7EB] rounded-lg shadow-lg">
//             <thead>
//               <tr className="bg-[#4B49AC] text-white">
//                 <th className="py-3 px-6 text-left border-b border-[#E5E7EB]">Field Label</th>
//                 <th className="py-3 px-6 text-left border-b border-[#E5E7EB]">Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {form.fields.map((field, index) => (
//                 <tr key={field.id || index} className="border-b border-[#E5E7EB] hover:bg-[#F3F4F6]">
//                   <td className="py-4 px-6 font-medium text-[#4B49AC]">{field.label}</td>
//                   <td className="py-4 px-6">
//                     {field.type === 'textEditor' ? (
//                       <div
//                         className="border-2 border-[#4B49AC] rounded-lg p-2 w-full bg-[#F3F4F6] text-gray-600 font-serif"
//                         dangerouslySetInnerHTML={{ __html: field.value }} // Displaying HTML content from the text editor
//                       />
//                     ) : (
//                       <input
//                         type={field.type}
//                         value={field.value}
//                         disabled
//                         className="border-2 border-[#4B49AC] rounded-lg p-2 w-full bg-[#F3F4F6] text-gray-600 font-serif focus:outline-none focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
//                       />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-600">Form not found.</p>
//       )}

//       {form && (
//         <div className="absolute bottom-4 right-4">
//           <button
//             onClick={downloadPDF}
//             className="bg-[#4B49AC] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#7DA0FA] transition-colors duration-300 ease-in-out"
//           >
//             <MdPictureAsPdf className="mr-2" />
//             Download PDF
//           </button>
//         </div>
//       )}

//       {isLoading && (
//         <div className="absolute bottom-4 right-4">
//           <BarLoader color="#36D7B7" width={100} /> {/* Customize loader color and width */}
//         </div>
//       )}
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// };

// export default ViewForm;


// working fine 0.0
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MdPictureAsPdf } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import { BarLoader } from 'react-spinners';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
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
import TemplatePicker from './TemplatePicker';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';

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

const genoa = {
  50: '#f3faf8',
  100: '#d7f0ea',
  200: '#b0dfd6',
  300: '#80c8bd',
  400: '#56aba0',
  500: '#3c9087',
  600: '#2e736d',
  700: '#285d59',
  800: '#244b49',
  900: '#21403e',
  950: '#0f2424',
};

const ViewForm = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showPicker, setShowPicker] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedForm, setEditedForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);
  const [isPublic, setIsPublic] = useState(false);
  const [expirationDateTime, setExpirationDateTime] = useState("");

  // Fetch form data from backend
  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        let url = `${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`;
        if (userId) {
          url += `?userId=${userId}`;
        }
        const response = await axios.get(url);
        setForm(response.data);
        setEditedForm(response.data);
        setSelectedTemplate(response.data.templateId || 1);
        setIsPublic(response.data.isPublic || false);
        setExpirationDateTime(response.data.expirationDateTime ? new Date(response.data.expirationDateTime).toISOString().slice(0, 16) : "");
      } catch (err) {
        console.error('Error fetching form:', err);
        setError('Form not found or error loading form');
        toast.error('Error loading form');
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchForm();
    }
  }, [formId, userId]);

  // Handle field value changes in edit mode
  const handleFieldChange = (fieldId, value) => {
    if (!isEditMode) return;
    
    setEditedForm(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, value } : field
      )
    }));
  };

  // Save edited form data
  const handleSave = async () => {
    if (!editedForm) return;
    
    setSaving(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`, editedForm);
      setForm(response.data.updatedForm);
      setEditedForm(response.data.updatedForm);
      setIsEditMode(false);
      toast.success('Form data saved successfully!');
    } catch (error) {
      console.error('Error saving form:', error);
      toast.error('Error saving form data');
    } finally {
      setSaving(false);
    }
  };

  // Generate shareable link
  const generateShareLink = () => {
    const baseUrl = window.location.origin;
    if (selectedTemplate && selectedTemplate > 1) {
      return `${baseUrl}/form/submit/templateid${selectedTemplate}/${formId}`;
    }
    return `${baseUrl}/form/submit/${formId}`;
  };

  // Copy share link to clipboard
  const copyShareLink = async () => {
    const shareLink = generateShareLink();
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      console.error('Error copying link:', error);
      toast.error('Error copying link');
    }
  };

  const splitFieldsByPage = (fields) => {
    const pages = [[]];
    fields.forEach(field => {
      if (field.type === 'pageBreak') {
        pages.push([]);
      } else {
        pages[pages.length - 1].push(field);
      }
    });
    return pages;
  };

  const addStyledPage = (doc, fieldsOnPage, pageIndex, totalPages) => {
    // Draw border rectangle
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277); // x, y, width, height (A4 page)

    // Optional: fill background
    // doc.setFillColor(245, 245, 255);
    // doc.rect(10, 10, 190, 277, 'F');

    let y = 25;
    fieldsOnPage.forEach(field => {
      doc.setFontSize(12);
      doc.text(`${field.label}: ${field.value || ''}`, 20, y);
      y += 12;
    });

    // Page number at the bottom
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    doc.text(`Page ${pageIndex + 1} of ${totalPages}`, 105, 285, { align: 'center' });
    doc.setTextColor(0, 0, 0);
  };

  const downloadPDF = async () => {
    setIsLoading(true);
    const jsPDF = (await import('jspdf')).default;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Form Name: ' + form.name, 20, 18);
    doc.setFontSize(12);
    doc.text('Form Info: ' + form.info, 20, 26);
    doc.text('', 10, 30);
    const pages = splitFieldsByPage(form.fields);
    pages.forEach((fieldsOnPage, idx) => {
      if (idx > 0) doc.addPage();
      addStyledPage(doc, fieldsOnPage, idx, pages.length);
    });
    setTimeout(() => {
      doc.save(`${form.name}.pdf`);
      setIsLoading(false);
      toast.success('Form downloaded successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }, 2000);
  };

  const handleTogglePublic = async (e) => {
    const newIsPublic = e.target.checked;
    setIsPublic(newIsPublic);
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`, {
        ...form,
        isPublic: newIsPublic,
      });
      toast.success(`Form is now ${newIsPublic ? 'public' : 'private'}`);
      setForm(prev => ({ ...prev, isPublic: newIsPublic }));
    } catch (err) {
      toast.error('Failed to update public/private status');
      setIsPublic(form.isPublic || false); // revert
    }
  };

  const handleExpirationChange = async (e) => {
    const newExpiration = e.target.value;
    setExpirationDateTime(newExpiration);
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`, {
        ...form,
        expirationDateTime: newExpiration ? new Date(newExpiration).toISOString() : undefined,
      });
      toast.success('Expiration date/time updated');
      setForm(prev => ({ ...prev, expirationDateTime: newExpiration ? new Date(newExpiration).toISOString() : undefined }));
    } catch (err) {
      toast.error('Failed to update expiration date/time');
      setExpirationDateTime(form.expirationDateTime ? new Date(form.expirationDateTime).toISOString().slice(0, 16) : ""); // revert
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <BarLoader color="#4B49AC" width={200} />
          <p className="mt-4 text-gray-600">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="p-8 min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">{error || 'Form not found'}</p>
          <Link 
            to="/forms" 
            className="bg-[#4B49AC] text-white px-4 py-2 rounded-lg hover:bg-[#7DA0FA] transition-colors duration-300"
          >
            Back to Forms
          </Link>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateComponents[selectedTemplate - 1];
  const currentForm = isEditMode ? editedForm : form;

  // Build values object for template
  const values = {};
  currentForm.fields.forEach(field => {
    if (field.type === 'address') {
      values[field.id] = {
        street: field.addressLine1 || '',
        line2: field.addressLine2 || '',
        city: field.city || '',
        state: field.state || '',
        zip: field.postCode || '',
        country: field.country || ''
      };
    } else {
      values[field.id] = field.value || '';
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: 2, md: 6 },
        position: 'relative',
        background: {
          xs: `linear-gradient(135deg, ${genoa[50]} 60%, ${genoa[200]} 100%)`,
          md: `linear-gradient(135deg, ${genoa[100]} 60%, ${genoa[300]} 100%)`,
        },
        transition: 'background 0.3s',
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-[#4B49AC]">
          {isEditMode ? 'Edit Form Data' : 'Preview Form'}
        </h2>
        <div className="flex gap-2">
          {!isEditMode && (
            <>
              <button
                className="bg-[#3c9087] hover:bg-[#2e736d] text-[#f3faf8] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200"
                onClick={() => setShowPicker(true)}
              >
                Select Template
              </button>
              <button
                className="bg-[#56aba0] hover:bg-[#3c9087] text-[#21403e] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200"
                onClick={() => setIsEditMode(true)}
              >
                Edit Data
              </button>
              <button
                className="bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200"
                onClick={copyShareLink}
              >
                Share Form
              </button>
              <Link
                to={`/form/responses/${formId}`}
                className="bg-gradient-to-r from-[#b0dfd6] to-[#80c8bd] hover:from-[#80c8bd] hover:to-[#b0dfd6] text-[#21403e] rounded-full font-semibold shadow px-5 py-2.5 focus:outline-none focus:ring-2 transition-all duration-200"
              >
                View Responses
              </Link>
            </>
          )}
          {isEditMode && (
            <>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
                onClick={() => {
                  setIsEditMode(false);
                  setEditedForm(form); // Reset to original data
                }}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      
      {!isEditMode && (
        <div className="mb-6">
          <span className="text-[#4B49AC] font-semibold">Current Template: </span>
          <span className="text-gray-700">{templateNames[selectedTemplate - 1]}</span>
        </div>
      )}

      {/* Share Link Modal */}
      {!isEditMode && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Share this form</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={generateShareLink()}
              readOnly
              className="flex-1 p-2 border border-gray-300 rounded-lg bg-white"
            />
            <button
              onClick={copyShareLink}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Copy Link
            </button>
          </div>
          <label className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={handleTogglePublic}
            />
            <span className="text-sm text-gray-700">Make this form public (shareable link)</span>
          </label>
          <div style={{ margin: '16px 0' }}>
            <TextField
              label="Expiration Date & Time"
              type="datetime-local"
              value={expirationDateTime}
              onChange={handleExpirationChange}
              InputLabelProps={{ shrink: true }}
            />
            <div className="text-xs text-gray-500 mt-1">After this date/time, the form will be inaccessible via the shareable link.</div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this link with others to collect their responses
          </p>
        </div>
      )}

      {/* Template Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
              onClick={() => setShowPicker(false)}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-[#4B49AC] mb-4">Select a Template</h3>
            <TemplatePicker selectedId={selectedTemplate} onSelect={id => { setSelectedTemplate(id); setShowPicker(false); }} />
          </div>
        </div>
      )}
      
      {/* Render the selected template */}
      <div className="mt-8">
        <TemplateComponent
          fields={currentForm.fields}
          values={values}
          readOnly={!isEditMode}
          onChange={handleFieldChange}
          name={currentForm.name}
          info={currentForm.info}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default ViewForm;
