import React from "react";
import { FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaFileAlt } from "react-icons/fa";
import DynamicFormRenderer from "../components/DynamicFormRenderer";

const JobApplicationTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  // Group fields for job info, personal info, education, experience
  const jobTitle = fields.find(f => f.label && f.label.toLowerCase().includes("job title"));
  const applicantName = fields.find(f => f.label && f.label.toLowerCase().includes("applicant name"));
  const email = fields.find(f => f.label && f.label.toLowerCase().includes("email"));
  const phone = fields.find(f => f.label && f.label.toLowerCase().includes("phone"));
  const address = fields.find(f => f.label && f.label.toLowerCase().includes("address"));
  const education = fields.find(f => f.label && f.label.toLowerCase().includes("education"));
  const experience = fields.find(f => f.label && f.label.toLowerCase().includes("experience"));
  const coverLetter = fields.find(f => f.label && f.label.toLowerCase().includes("cover letter"));
  const otherFields = fields.filter(f => ![jobTitle, applicantName, email, phone, address, education, experience, coverLetter].includes(f));

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-blue-100 rounded-2xl shadow-2xl p-0 border border-[#E5E7EB] overflow-hidden">
      {/* Resume Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-6 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-2xl font-bold mb-1">
            <FaUserTie className="inline-block" /> {name || (jobTitle ? values[jobTitle.id] : "Job Title")}
          </div>
          <div className="flex items-center gap-2 text-lg">
            <FaFileAlt className="inline-block" /> {info || (applicantName ? values[applicantName.id] : "Applicant Name")}
          </div>
        </div>
      </div>
      {/* Personal Info Section */}
      <div className="px-8 py-6 bg-white flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {email && (
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 w-full">
              <FaEnvelope className="text-blue-400" />
              <div className="flex-1">
                <DynamicFormRenderer
                  fields={[email]}
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
          {phone && (
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 w-full">
              <FaPhone className="text-blue-400" />
              <div className="flex-1">
                <DynamicFormRenderer
                  fields={[phone]}
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
          {address && (
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 w-full">
              <FaMapMarkerAlt className="text-blue-400" />
              <div className="flex-1">
                <DynamicFormRenderer
                  fields={[address]}
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
        <div className="flex-1 flex flex-col gap-4">
          {education && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2">
                <FaGraduationCap className="text-blue-400" /> Education
              </div>
              <DynamicFormRenderer
                fields={[education]}
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
          {experience && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2">
                <FaBriefcase className="text-blue-400" /> Experience
              </div>
              <DynamicFormRenderer
                fields={[experience]}
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
      </div>
      {/* Cover Letter & Other Fields */}
      <div className="px-8 pb-6 flex flex-col gap-4">
        {coverLetter && (
          <div className="bg-blue-50 rounded-lg p-4 shadow-inner">
            <div className="font-semibold text-blue-700 mb-1 flex items-center gap-2">
              <FaFileAlt className="text-blue-400" /> Cover Letter
            </div>
            <DynamicFormRenderer
              fields={[coverLetter]}
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
        {/* Render any other fields dynamically */}
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
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobApplicationTemplate; 