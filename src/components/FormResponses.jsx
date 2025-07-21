import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { BarLoader } from 'react-spinners';
import { MdDownload, MdDelete, MdVisibility } from 'react-icons/md';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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
import html2canvas from 'html2canvas';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';

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

const FormResponses = () => {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const responseContentRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);

  // Fetch form and responses
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Try public endpoint first
        let formResponse = null;
        try {
          formResponse = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/forms/public/${formId}`);
        } catch (err) {
          // If not public, fallback to private endpoint with userId
          let url = `${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`;
          if (userId) url += `?userId=${userId}`;
          formResponse = await axios.get(url);
        }
        setForm(formResponse.data);
        // Now fetch responses
        let responsesUrl = formResponse.data.isPublic
          ? `${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}/responses`
          : `${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}/responses${userId ? `?userId=${userId}` : ''}`;
        const responsesResponse = await axios.get(responsesUrl);
        setResponses(responsesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading form responses');
        toast.error('Error loading responses');
      } finally {
        setLoading(false);
      }
    };

    if (formId) {
      fetchData();
    }
  }, [formId, userId]);

  // View response details
  const viewResponse = (response) => {
    setSelectedResponse(response);
    setShowResponseModal(true);
  };

  // Replace deleteResponse with a function that opens the dialog
  const handleDeleteClick = (responseId) => {
    setPendingDeleteId(responseId);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setConfirmOpen(false);
    if (!pendingDeleteId) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/responses/${pendingDeleteId}`);
      setResponses(prev => prev.filter(r => r._id !== pendingDeleteId));
      toast.success('Response deleted successfully');
    } catch (error) {
      console.error('Error deleting response:', error);
      toast.error('Error deleting response');
    }
    setPendingDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
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

  // Download single response as PDF
  const downloadResponsePDF = async (response) => {
    const jsPDF = (await import('jspdf')).default;
    const autoTable = (await import('jspdf-autotable')).default;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Response to: ${form.name}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Submitted: ${new Date(response.submittedAt).toLocaleString()}`, 10, 20);
    doc.text('', 10, 30);

    const pages = splitFieldsByPage(form.fields);
    pages.forEach((fieldsOnPage, idx) => {
      if (idx > 0) doc.addPage();
      const rows = fieldsOnPage.map(field => {
        const answer = response.answers.find(a => a.fieldLabel === field.label);
        return {
          label: field.label,
          value: answer ? (field.type === 'textEditor' ? (answer.value || '').replace(/(<([^>]+)>)/gi, '') : answer.value) : '',
        };
      });
      if (rows.length > 0) {
        autoTable(doc, {
          columns: [
            { header: 'Field Label', dataKey: 'label' },
            { header: 'Value', dataKey: 'value' },
          ],
          body: rows,
          startY: 40,
          theme: 'striped',
          styles: { cellPadding: 3, fontSize: 10, overflow: 'linebreak' },
          headStyles: { fillColor: [75, 73, 172], textColor: [255, 255, 255] },
        });
      }
    });
    doc.save(`${form.name}_response.pdf`);
  };

  // Download all responses as CSV
  const downloadAllResponsesCSV = () => {
    if (responses.length === 0) {
      toast.warning('No responses to download');
      return;
    }

    // Get all unique field labels
    const fieldLabels = new Set();
    responses.forEach(response => {
      response.answers.forEach(answer => {
        fieldLabels.add(answer.fieldLabel);
      });
    });

    const labels = Array.from(fieldLabels);
    
    // Create CSV header
    let csv = 'Submitted At,' + labels.join(',') + '\n';
    
    // Add data rows
    responses.forEach(response => {
      const row = [new Date(response.submittedAt).toLocaleString()];
      labels.forEach(label => {
        const answer = response.answers.find(a => a.fieldLabel === label);
        const value = answer ? answer.value : '';
        row.push(`"${value}"`);
      });
      csv += row.join(',') + '\n';
    });

    // Download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${form.name}-responses.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Add a function to download Excel
  const downloadAllResponsesExcel = () => {
    if (responses.length === 0) {
      toast.warning('No responses to download');
      return;
    }
    // Get all unique field labels
    const fieldLabels = new Set();
    responses.forEach(response => {
      response.answers.forEach(answer => {
        fieldLabels.add(answer.fieldLabel);
      });
    });
    const labels = Array.from(fieldLabels);
    // Create data rows
    const data = responses.map(response => {
      const row = { 'Submitted At': new Date(response.submittedAt).toLocaleString() };
      labels.forEach(label => {
        const answer = response.answers.find(a => a.fieldLabel === label);
        row[label] = answer ? answer.value : '';
      });
      return row;
    });
    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    // Download Excel file
    XLSX.writeFile(wb, `${form.name}-responses.xlsx`);
  };

  // Prepare chart data: one bar for total responses
  const chartData = [
    { name: 'Total Responses', count: responses.length }
  ];

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0] flex items-center justify-center">
        <div className="text-center">
          <BarLoader color="#4B49AC" width={200} />
          <p className="mt-4 text-gray-600">Loading responses...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0] flex items-center justify-center">
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

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-[#b0dfd6] via-[#80c8bd] to-[#56aba0]">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-[#4B49AC]">Form Responses</h2>
          <p className="text-gray-600 mt-2">{form.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={downloadAllResponsesCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
          >
            <MdDownload />
            Download All (CSV)
          </button>
          <Link
            to={`/form/view/${formId}`}
            className="bg-[#4B49AC] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#7DA0FA] transition-colors duration-300"
          >
            Back to Form
          </Link>
        </div>
      </div>

      {/* Chart and Excel Download */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="w-full md:w-1/2 h-64 bg-white rounded-2xl shadow p-4 flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-[#21403e] mb-2">Responses Overview</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3c9087" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col items-center md:items-end justify-center w-full md:w-auto">
          <button
            onClick={downloadAllResponsesExcel}
            className="bg-gradient-to-r from-[#3c9087] to-[#56aba0] hover:from-[#56aba0] hover:to-[#3c9087] text-[#f3faf8] rounded-full font-semibold shadow px-8 py-3 focus:outline-none focus:ring-2 focus:ring-[#3c9087] transition-all duration-200 mb-2"
          >
            Download as Excel
          </button>
        </div>
      </div>

      {/* Response Statistics */}
      <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-[#4B49AC] mb-2">Response Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#4B49AC]">{responses.length}</div>
            <div className="text-gray-600">Total Responses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {responses.length > 0 ? new Date(responses[0].submittedAt).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-gray-600">Latest Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {responses.length > 0 ? new Date(responses[responses.length - 1].submittedAt).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-gray-600">First Response</div>
          </div>
        </div>
      </div>

      {/* Responses List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-[#4B49AC] text-white">
          <h3 className="text-lg font-semibold">All Responses</h3>
        </div>
        
        {responses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-xl mb-2">No responses yet</p>
            <p>Share your form to start collecting responses</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {responses.map((response, index) => (
                  <tr key={response._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(response.submittedAt).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Response #{index + 1}
                      </div>
                      {response.templateInfo && (
                        <div className="text-sm text-gray-500 mb-2">Template: {response.templateInfo.templateName || `#${response.templateInfo.templateNumber}`}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => viewResponse(response)}
                          className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                        >
                          <MdVisibility />
                          View
                        </button>
                        <button
                          onClick={() => downloadResponsePDF(response)}
                          className="text-green-600 hover:text-green-900 flex items-center gap-1"
                        >
                          <MdDownload />
                          PDF
                        </button>
                        <button
                          onClick={() => handleDeleteClick(response._id)}
                          className="text-red-600 hover:text-red-900 flex items-center gap-1"
                        >
                          <MdDelete />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Response Detail Modal */}
      {showResponseModal && selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#4B49AC]">
                Response Details
              </h3>
              <button
                onClick={() => setShowResponseModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Submitted:</strong> {new Date(selectedResponse.submittedAt).toLocaleString()}
              </p>
              {selectedResponse.templateInfo && (
                <p className="text-sm text-gray-600">
                  <strong>Template:</strong> {selectedResponse.templateInfo.templateName || `#${selectedResponse.templateInfo.templateNumber}`}
                </p>
              )}
            </div>
            {/* Always render using the correct template */}
            <div ref={responseContentRef} style={{ background: 'white', padding: 0 }}>
              {(() => {
                const TemplateComponent = templateComponents[(selectedResponse.templateInfo?.templateNumber || 1) - 1] || Template1;
                const values = selectedResponse.answers.reduce((acc, ans) => ({ ...acc, [ans.fieldId]: ans.value }), {});
                return (
                  <TemplateComponent
                    fields={form.fields}
                    values={values}
                    validationErrors={{}}
                    readOnly={true}
                    name={form.name}
                    info={form.info}
                  />
                );
              })()}
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={async () => {
                  if (!responseContentRef.current) return;
                  const canvas = await html2canvas(responseContentRef.current, { scale: 2, useCORS: true });
                  const imgData = canvas.toDataURL('image/png');
                  // Set PDF size to match the canvas size (full form, no margins)
                  const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [canvas.width, canvas.height]
                  });
                  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
                  pdf.save(`response-${selectedResponse._id}.pdf`);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
              >
                <MdDownload />
                Download PDF
              </button>
              <button
                onClick={() => setShowResponseModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Material UI Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle sx={{ color: '#21403e', fontWeight: 700 }}>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#285d59' }}>
            Are you sure you want to delete this response? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} sx={{ color: '#3c9087', fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleConfirmDelete} sx={{ color: '#f3faf8', background: 'linear-gradient(90deg,#3c9087,#56aba0)', fontWeight: 600, borderRadius: '999px', px: 3, '&:hover': { background: 'linear-gradient(90deg,#56aba0,#3c9087)' } }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default FormResponses; 