import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaCalendarAlt, FaUser, FaPaperPlane } from 'react-icons/fa';

function groupFields(fields) {
  const groups = {
    'Appointment Details': [],
    'Contact Info': []
  };
  fields.forEach(field => {
    const type = field.type.toLowerCase();
    if (["date", "time", "datetime", "dropdown", "optiongroup", "spreadsheet"].some(t => type.includes(t)) || /date|time|slot|service|appointment/i.test(field.label)) {
      groups['Appointment Details'].push(field);
    } else {
      groups['Contact Info'].push(field);
    }
  });
  return groups;
}

const groupIcons = {
  'Appointment Details': <FaCalendarAlt className="text-2xl text-[#4B49AC] mr-2" />,
  'Contact Info': <FaUser className="text-2xl text-[#4B49AC] mr-2" />,
};

const AppointmentBookingTemplate = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  const grouped = groupFields(fields);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] via-[#e3f2fd] to-[#e8f5e9] py-10">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow-2xl bg-white/90 border border-[#B3E5FC] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#4B49AC] mb-2 tracking-tight drop-shadow">{name || "Book an Appointment"}</h2>
          <p className="text-lg text-[#0097a7]">{info || "Schedule your appointment easily. Fill in your details below."}</p>
        </div>
        <div className="space-y-10">
          {Object.entries(grouped).map(([group, groupFields]) => (
            groupFields.length > 0 && (
              <div key={group} className="bg-white rounded-2xl shadow-xl border border-[#B3E5FC] p-8">
                <div className="flex items-center mb-4">
                  {groupIcons[group]}
                  <h3 className="text-xl font-bold text-[#4B49AC] tracking-wide">{group}</h3>
                </div>
                <DynamicFormRenderer
                  fields={groupFields}
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
            )
          ))}
          {!readOnly && (
            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={onSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-[#4B49AC] to-[#0097a7] text-white hover:from-[#0097a7] hover:to-[#4B49AC] focus:outline-none focus:ring-4 focus:ring-[#B3E5FC]/30 ${
                  isSubmitting ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                <FaPaperPlane className="text-xl" />
                {isSubmitting ? (
                  <span className="flex items-center">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Booking...
                  </span>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingTemplate; 