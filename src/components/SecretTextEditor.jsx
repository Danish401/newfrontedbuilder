// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateField, setActiveField } from "../features/formSlice";

// const SecretTextEditor = ({ field }) => {
//   const dispatch = useDispatch();
//   const [label, setLabel] = useState(field.label);
//   const [placeholder, setPlaceholder] = useState(field.placeholder);
//   const [helpText, setHelpText] = useState(field.helpText);
//   const [required, setRequired] = useState(field.required);

//   const handleSave = () => {
//     dispatch(
//       updateField({
//         id: field.id,
//         label,
//         placeholder,
//         required,
//         helpText,
//       })
//     );
//     dispatch(setActiveField(null));
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md border border-gray-200">
//       <h2 className="text-lg font-semibold mb-4 text-gray-900">Edit Secret Text Field</h2>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-900">Field Name</label>
//         <input
//           type="text"
//           className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//           placeholder="Secret Text"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-900">Placeholder</label>
//         <textarea
//           rows="3"
//           className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
//           value={placeholder}
//           onChange={(e) => setPlaceholder(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-900">Help Text</label>
//         <input
//           type="text"
//           className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 hover:border-gray-400 transition-colors duration-300"
//           value={helpText}
//           onChange={(e) => setHelpText(e.target.value)}
//         />
//       </div>
//       <div className="mb-4">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             className="form-checkbox text-blue-600 rounded border-gray-300 focus:ring-blue-500"
//             checked={required}
//             onChange={(e) => setRequired(e.target.checked)}
//           />
//           <span className="ml-2 text-gray-900">Required</span>
//         </label>
//       </div>
//       <div className="flex justify-end">
//         <button
//           className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300"
//           onClick={handleSave}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SecretTextEditor;






// css 

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField, setActiveField } from "../features/formSlice";

const SecretTextEditor = ({ field }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder);
  const [helpText, setHelpText] = useState(field.helpText);
  const [required, setRequired] = useState(field.required);

  const handleSave = () => {
    dispatch(
      updateField({
        id: field.id,
        label,
        placeholder,
        required,
        helpText,
      })
    );
    dispatch(setActiveField(null));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#E5E5E5]">
      <h2 className="text-lg font-semibold mb-4 text-[#4B49AC]">Edit Secret Text Field</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Field Name</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Secret Text"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Placeholder</label>
        <textarea
          rows="3"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={placeholder}
          onChange={(e) => setPlaceholder(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#4B49AC]">Help Text</label>
        <input
          type="text"
          className="mt-1 block w-full border-2 border-[#4B49AC] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300"
          value={helpText}
          onChange={(e) => setHelpText(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="flex items-center text-[#4B49AC]">
          <input
            type="checkbox"
            className="form-checkbox text-[#7DA0FA] rounded border-[#4B49AC] focus:ring-[#7DA0FA]"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          <span className="ml-2">Required</span>
        </label>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#7978E9] focus:outline-none focus:ring-2 focus:ring-[#7DA0FA] transition-colors duration-300"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SecretTextEditor;
