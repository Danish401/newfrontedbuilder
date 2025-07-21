import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone, FaRegStickyNote } from "react-icons/fa";
import DynamicFormRenderer from "../components/DynamicFormRenderer";

const EventRegistrationTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  // Group fields for event info and attendee info
  const eventName = fields.find(f => f.label && f.label.toLowerCase().includes("event name"));
  const date = fields.find(f => f.label && f.label.toLowerCase().includes("date"));
  const location = fields.find(f => f.label && f.label.toLowerCase().includes("location"));
  const attendeeName = fields.find(f => f.label && f.label.toLowerCase().includes("attendee name"));
  const email = fields.find(f => f.label && f.label.toLowerCase().includes("email"));
  const phone = fields.find(f => f.label && f.label.toLowerCase().includes("phone"));
  const specialRequests = fields.find(f => f.label && f.label.toLowerCase().includes("special requests"));
  const otherFields = fields.filter(f => ![eventName, date, location, attendeeName, email, phone, specialRequests].includes(f));

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-purple-100 to-blue-50 rounded-2xl shadow-2xl p-0 border border-[#E5E7EB] overflow-hidden">
      {/* Event Ticket Header */}
      <div className="bg-gradient-to-r from-purple-400 to-blue-500 text-white px-8 py-6 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-2xl font-bold mb-1">
            <FaCalendarAlt className="inline-block" /> {name || (eventName ? values[eventName.id] : "Event Name")}
          </div>
          <div className="text-sm text-blue-100">{info || (location ? values[location.id] : "Location")}</div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 text-lg">
            <FaCalendarAlt className="inline-block" />
            {date ? values[date.id] : "Date"}
          </div>
        </div>
      </div>
      {/* Attendee Info Section */}
      <div className="px-8 py-6 bg-white flex flex-col md:flex-row gap-8">
        <div className="flex-1 flex flex-col gap-4">
          {attendeeName && (
            <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-3 w-full">
              <FaUser className="text-blue-400" />
              <div className="flex-1">
                <DynamicFormRenderer
                  fields={[attendeeName]}
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
        </div>
        <div className="flex-1 flex flex-col gap-4">
          {specialRequests && (
            <div className="bg-purple-50 rounded-lg p-4 shadow-inner">
              <div className="font-semibold text-purple-700 mb-1 flex items-center gap-2">
                <FaRegStickyNote className="text-purple-400" /> Special Requests
              </div>
              <DynamicFormRenderer
                fields={[specialRequests]}
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
        </div>
      </div>
      {!readOnly && (
        <div className="bg-gradient-to-r from-purple-400 to-blue-500 px-8 py-4 flex justify-end">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-white text-purple-700 font-bold py-2 px-8 rounded-lg shadow hover:bg-purple-100 transition-colors duration-300"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationTemplate; 