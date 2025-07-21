import React from "react";
import { FaUser, FaEnvelope, FaStar, FaCommentDots, FaLightbulb } from "react-icons/fa";
import DynamicFormRenderer from "../components/DynamicFormRenderer";
import CustomizedRating from '../components/CustomizedRating';

const FeedbackTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  // Group fields for feedback info
  const nameField = fields.find(f => f.label && f.label.toLowerCase().includes("name"));
  const email = fields.find(f => f.label && f.label.toLowerCase().includes("email"));
  const rating = fields.find(f => f.label && f.label.toLowerCase().includes("rating"));
  const feedback = fields.find(f => f.label && f.label.toLowerCase().includes("feedback"));
  const suggestions = fields.find(f => f.label && f.label.toLowerCase().includes("suggestions"));
  const otherFields = fields.filter(f => ![nameField, email, rating, feedback, suggestions].includes(f));

  return (
    <div className="max-w-lg mx-auto bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-2xl p-0 border border-[#E5E7EB] overflow-hidden">
      {/* Feedback Card Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-200 text-white px-8 py-6 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-2xl font-bold mb-1">
            <FaCommentDots className="inline-block" /> {name || "Feedback Survey"}
          </div>
          <div className="text-lg text-yellow-100">{info || "We value your feedback!"}</div>
        </div>
      </div>
      {/* Feedback Info Section */}
      <div className="px-8 py-6 bg-white flex flex-col gap-4">
        {nameField && (
          <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-3 w-full">
            <FaUser className="text-yellow-400" />
            <div className="flex-1">
              <DynamicFormRenderer
                fields={[nameField]}
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
        {email && (
          <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-3 w-full">
            <FaEnvelope className="text-yellow-400" />
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
        {rating && (
          <div className="flex items-center gap-2 bg-yellow-50 rounded-lg p-3 w-full">
            <CustomizedRating field={rating} />
            <div className="flex-1">
              <DynamicFormRenderer
                fields={[rating]}
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
        {feedback && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="font-semibold text-yellow-700 mb-1 flex items-center gap-2">
              <FaCommentDots className="text-yellow-400" /> Feedback
            </div>
            <DynamicFormRenderer
              fields={[feedback]}
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
        {suggestions && (
          <div className="bg-yellow-50 rounded-lg p-4 shadow-inner">
            <div className="font-semibold text-yellow-700 mb-1 flex items-center gap-2">
              <FaLightbulb className="text-yellow-400" /> Suggestions
            </div>
            <DynamicFormRenderer
              fields={[suggestions]}
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
          <div className="bg-yellow-50 rounded-lg shadow-inner p-4">
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
            className="w-full bg-yellow-400 text-white py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300 mt-4"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackTemplate; 