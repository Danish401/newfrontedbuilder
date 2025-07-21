import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaFileInvoiceDollar, FaUser, FaTruck, FaList, FaPaperPlane } from 'react-icons/fa';

function groupFields(fields) {
  const groups = {
    'Billing Info': [],
    'Shipping Info': [],
    'Line Items': [],
    'Summary': []
  };
  fields.forEach(field => {
    const label = field.label.toLowerCase();
    if (/bill|billing|company|address|email|phone/.test(label)) {
      groups['Billing Info'].push(field);
    } else if (/ship|shipping|delivery|recipient/.test(label)) {
      groups['Shipping Info'].push(field);
    } else if (/item|product|qty|quantity|price|amount|line/i.test(label) || field.type === 'spreadsheet') {
      groups['Line Items'].push(field);
    } else if (/total|tax|summary|grand|due|balance/.test(label)) {
      groups['Summary'].push(field);
    } else {
      groups['Billing Info'].push(field); // Default to billing if not matched
    }
  });
  return groups;
}

const groupIcons = {
  'Billing Info': <FaUser className="text-2xl text-[#4B49AC] mr-2" />,
  'Shipping Info': <FaTruck className="text-2xl text-[#4B49AC] mr-2" />,
  'Line Items': <FaList className="text-2xl text-[#4B49AC] mr-2" />,
  'Summary': <FaFileInvoiceDollar className="text-2xl text-[#4B49AC] mr-2" />,
};

const InvoiceTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  const grouped = groupFields(fields);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e3f2fd] via-[#f9fafb] to-[#e0e7ff] py-10">
      <div className="max-w-4xl w-full p-10 rounded-3xl shadow-2xl bg-white/95 border border-[#B3E5FC] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#4B49AC] mb-2 tracking-tight drop-shadow">{name || "Invoice"}</h2>
          <p className="text-lg text-[#1976d2]">{info || "Professional invoice layout with clear sections and summary."}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow border border-[#B3E5FC] p-6">
            <div className="flex items-center mb-4">
              {groupIcons['Billing Info']}
              <h3 className="text-xl font-bold text-[#4B49AC] tracking-wide">Billing Info</h3>
            </div>
            <DynamicFormRenderer
              fields={grouped['Billing Info']}
              formData={values}
              validationErrors={validationErrors}
              onFieldChange={onChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              showSubmit={false}
              readOnly={readOnly}
            />
          </div>
          <div className="bg-white rounded-2xl shadow border border-[#B3E5FC] p-6">
            <div className="flex items-center mb-4">
              {groupIcons['Shipping Info']}
              <h3 className="text-xl font-bold text-[#4B49AC] tracking-wide">Shipping Info</h3>
            </div>
            <DynamicFormRenderer
              fields={grouped['Shipping Info']}
              formData={values}
              validationErrors={validationErrors}
              onFieldChange={onChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              showSubmit={false}
              readOnly={readOnly}
            />
          </div>
        </div>
        {grouped['Line Items'].length > 0 && (
          <div className="bg-white rounded-2xl shadow border border-[#B3E5FC] p-6 mb-10">
            <div className="flex items-center mb-4">
              {groupIcons['Line Items']}
              <h3 className="text-xl font-bold text-[#4B49AC] tracking-wide">Line Items</h3>
            </div>
            <DynamicFormRenderer
              fields={grouped['Line Items']}
              formData={values}
              validationErrors={validationErrors}
              onFieldChange={onChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              showSubmit={false}
              readOnly={readOnly}
            />
          </div>
        )}
        {grouped['Summary'].length > 0 && (
          <div className="bg-[#f1f8e9] rounded-2xl shadow border border-[#B3E5FC] p-6 mb-10">
            <div className="flex items-center mb-4">
              {groupIcons['Summary']}
              <h3 className="text-xl font-bold text-[#388e3c] tracking-wide">Summary</h3>
            </div>
            <DynamicFormRenderer
              fields={grouped['Summary']}
              formData={values}
              validationErrors={validationErrors}
              onFieldChange={onChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
              showSubmit={false}
              readOnly={readOnly}
            />
          </div>
        )}
        {!readOnly && (
          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#4B49AC] to-[#1976d2] text-white hover:from-[#1976d2] hover:to-[#4B49AC] focus:outline-none focus:ring-4 focus:ring-[#B3E5FC]/30 ${
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
                'Submit Invoice'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceTemplate; 