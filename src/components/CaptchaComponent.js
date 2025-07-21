// import React, { useState } from 'react';

// const CaptchaComponent = ({ field, onChange, onFieldUpdate }) => {
//   const [captchaText, setCaptchaText] = useState(field.captchaText || "ABCD");

//   const handleInputChange = (e) => {
//     onChange(e.target.value);
//   };

//   const handleFieldUpdate = (e) => {
//     const { name, value, checked } = e.target;
//     onFieldUpdate({ [name]: value, required: checked });
//   };

//   return (
//     <div>
//       <div className="captcha-container mb-4">
//         <img
//           src={`https://via.placeholder.com/150?text=${captchaText}`}
//           alt="CAPTCHA"
//           className="mb-2"
//         />
//       </div>
//       <input
//         type="text"
//         placeholder="Type the CAPTCHA here..."
//         className="mt-1 block w-full border-gray-800 rounded-md shadow-sm"
//         value={field.userInput}
//         onChange={handleInputChange}
//       />
//       <div className="mt-4">
//         <label className="block text-sm font-medium text-gray-700">Field Name</label>
//         <input
//           type="text"
//           name="label"
//           placeholder="Enter field name..."
//           className="mt-1 block w-full border-gray-800 rounded-md shadow-sm"
//           value={field.label}
//           onChange={handleFieldUpdate}
//         />
//         <label className="block text-sm font-medium text-gray-700 mt-2">Placeholder Text</label>
//         <input
//           type="text"
//           name="placeholder"
//           placeholder="Enter placeholder text..."
//           className="mt-1 block w-full border-gray-800 rounded-md shadow-sm"
//           value={field.placeholder}
//           onChange={handleFieldUpdate}
//         />
//         <label className="block text-sm font-medium text-gray-700 mt-2">
//           <input
//             type="checkbox"
//             name="required"
//             checked={field.required}
//             onChange={handleFieldUpdate}
//             className="mr-2"
//           />
//           Required
//         </label>
//       </div>
//     </div>
//   );
// };

// export default CaptchaComponent;
