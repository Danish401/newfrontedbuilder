import React from "react";
import { FaBuilding, FaMapMarkerAlt, FaUserTie, FaGlobe, FaEnvelope, FaPhone } from "react-icons/fa";
import DynamicFormRenderer from "../components/DynamicFormRenderer";

const CompanyProfileTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  // Group fields by type/section for a business profile look
  const logoField = fields.find(f => f.label && f.label.toLowerCase().includes("logo"));
  const nameField = fields.find(f => f.label && f.label.toLowerCase().includes("company name"));
  const addressField = fields.find(f => f.label && f.label.toLowerCase().includes("address"));
  const aboutField = fields.find(f => f.label && f.label.toLowerCase().includes("about"));
  const websiteField = fields.find(f => f.label && f.label.toLowerCase().includes("website"));
  const emailField = fields.find(f => f.label && f.label.toLowerCase().includes("email"));
  const phoneField = fields.find(f => f.label && f.label.toLowerCase().includes("phone"));
  const keyPeople = fields.filter(f => f.label && f.label.toLowerCase().startsWith("key person"));
  const otherFields = fields.filter(f => ![logoField, nameField, addressField, aboutField, websiteField, emailField, phoneField, ...keyPeople].includes(f));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white py-10">
      <div className="max-w-3xl w-full p-10 rounded-2xl shadow-2xl bg-white border border-[#E5E7EB] flex flex-col md:flex-row gap-8">
        {/* Left: Logo & Company Info */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-6">
          {logoField && values[logoField.id] && (
            <img src={values[logoField.id]} alt="Logo" className="w-28 h-28 object-contain rounded-full border-4 border-blue-200 shadow-lg" />
          )}
          <div className="text-center md:text-left w-full">
            <h2 className="text-3xl font-extrabold text-blue-700 flex items-center gap-2 mb-1">
              <FaBuilding className="inline-block text-blue-400" /> {name || (nameField ? values[nameField?.id] : "Company Name")}
            </h2>
            <div className="text-gray-600 flex items-center gap-2 mb-2">
              <FaMapMarkerAlt className="inline-block text-blue-300" />
              {info || (addressField ? values[addressField?.id] : "Address")}
            </div>
            {websiteField && (
              <div className="text-blue-500 flex items-center gap-2">
                <FaGlobe className="inline-block" />
                {values[websiteField.id]}
              </div>
            )}
          </div>
          {aboutField && (
            <div className="bg-blue-50 rounded-lg p-4 shadow-inner w-full">
              <div className="font-semibold text-blue-700 mb-1">About</div>
              <DynamicFormRenderer
                fields={[aboutField]}
                formData={values}
                validationErrors={validationErrors}
                onFieldChange={onChange}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                showSubmit={false}
                readOnly={readOnly}
                layout="vertical"
              />
            </div>
          )}
        </div>
        {/* Right: Contact & Key People & Other Fields */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emailField && (
              <div className="flex items-center gap-2 bg-white rounded-lg shadow p-3 w-full">
                <FaEnvelope className="text-blue-400" />
                <div className="flex-1">
                  <DynamicFormRenderer
                    fields={[emailField]}
                    formData={values}
                    validationErrors={validationErrors}
                    onFieldChange={onChange}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    showSubmit={false}
                    readOnly={readOnly}
                    layout="vertical"
                  />
                </div>
              </div>
            )}
            {phoneField && (
              <div className="flex items-center gap-2 bg-white rounded-lg shadow p-3 w-full">
                <FaPhone className="text-blue-400" />
                <div className="flex-1">
                  <DynamicFormRenderer
                    fields={[phoneField]}
                    formData={values}
                    validationErrors={validationErrors}
                    onFieldChange={onChange}
                    onSubmit={onSubmit}
                    isSubmitting={isSubmitting}
                    showSubmit={false}
                    readOnly={readOnly}
                    layout="vertical"
                  />
                </div>
              </div>
            )}
          </div>
          {keyPeople.length > 0 && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                <FaUserTie className="text-blue-400" /> Key People
              </div>
              <ul className="space-y-2">
                {keyPeople.map(person => (
                  <li key={person.id} className="text-gray-700 text-sm">
                    <DynamicFormRenderer
                      fields={[person]}
                      formData={values}
                      validationErrors={validationErrors}
                      onFieldChange={onChange}
                      onSubmit={onSubmit}
                      isSubmitting={isSubmitting}
                      showSubmit={false}
                      readOnly={readOnly}
                      layout="vertical"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {otherFields.length > 0 && (
            <div className="bg-blue-50 rounded-lg shadow-inner p-4">
              <DynamicFormRenderer
                fields={otherFields}
                formData={values}
                validationErrors={validationErrors}
                onFieldChange={onChange}
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
                showSubmit={false}
                readOnly={readOnly}
                layout="vertical"
              />
            </div>
          )}
          {!readOnly && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-full bg-blue-700 text-white py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors duration-300 mt-4"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Profile'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileTemplate; 