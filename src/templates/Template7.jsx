import React from "react";
import DynamicFormRenderer from '../components/DynamicFormRenderer';
import { FaUser, FaCog, FaUpload, FaStar, FaRegSmile, FaPaperPlane } from 'react-icons/fa';

const fieldIcons = {
  name: <FaUser className="text-pink-400 text-2xl mr-2" />,
  email: <FaUser className="text-blue-400 text-2xl mr-2" />,
  phone: <FaUser className="text-green-400 text-2xl mr-2" />,
  address: <FaUser className="text-yellow-400 text-2xl mr-2" />,
  dropdown: <FaCog className="text-purple-400 text-2xl mr-2" />,
  optiongroup: <FaCog className="text-purple-400 text-2xl mr-2" />,
  checkbox: <FaCog className="text-purple-400 text-2xl mr-2" />,
  radiogroup: <FaCog className="text-purple-400 text-2xl mr-2" />,
  multiplecheckbox: <FaCog className="text-purple-400 text-2xl mr-2" />,
  fileupload: <FaUpload className="text-indigo-400 text-2xl mr-2" />,
  signature: <FaUpload className="text-indigo-400 text-2xl mr-2" />,
  spreadsheet: <FaUpload className="text-indigo-400 text-2xl mr-2" />,
  dropzone: <FaUpload className="text-indigo-400 text-2xl mr-2" />,
  rating: <FaStar className="text-yellow-400 text-2xl mr-2" />,
  feedback: <FaRegSmile className="text-pink-400 text-2xl mr-2" />,
  default: <FaRegSmile className="text-gray-400 text-2xl mr-2" />,
};

const getFieldIcon = (field) => {
  const type = field.type.toLowerCase();
  return fieldIcons[type] || fieldIcons.default;
};

const Template7 = ({ fields, values, validationErrors, onChange, onSubmit, isSubmitting, readOnly, name, info }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-green-100 py-10">
      <div className="max-w-2xl w-full p-8 rounded-3xl shadow-2xl bg-white/80 border border-[#E5E7EB] backdrop-blur-md">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-pink-400 mb-2 tracking-tight drop-shadow">{name || "Playful Pastel Form"}</h2>
          <p className="text-lg text-blue-400">{info || "Each field floats in its own card with a playful icon. Friendly and inviting!"}</p>
        </div>
        <div className="grid grid-cols-1 gap-8">
          {fields.map(field => (
            <div key={field.id} className="bg-white rounded-2xl shadow-xl border border-pink-200 p-6 flex items-center space-x-4 transition-transform duration-200 hover:scale-[1.02] hover:shadow-2xl">
              {getFieldIcon(field)}
              <div className="flex-1">
                <DynamicFormRenderer
                  fields={[field]}
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
          ))}
        </div>
        {!readOnly && (
          <div className="flex justify-center pt-10">
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300 bg-gradient-to-r from-pink-400 to-blue-400 text-white hover:from-blue-400 hover:to-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-200/30 ${
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
                'Submit Form'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Template7; 