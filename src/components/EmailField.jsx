// import React, { useState, useEffect } from 'react';

// const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

// const EmailField = ({ field, handleFieldChange }) => {
//   const [value, setValue] = useState(field.value || '');
//   const [error, setError] = useState('');
//   // Use fixed validation pattern for email
//   const validationPattern = emailRegex;
//   const validationMessage = 'Please enter a valid email address (lowercase, must contain @, and domain)';

//   useEffect(() => {
//     setValue(field.value || '');
//   }, [field.value]);

//   useEffect(() => {
//     if (value && !validationPattern.test(value)) {
//       setError(validationMessage);
//     } else {
//       setError('');
//     }
//   }, [value]);

//   useEffect(() => {
//     handleFieldChange(field.id, value);
//     // eslint-disable-next-line
//   }, [value]);

//   return (
//     <div className="p-4">
//       <div className="flex items-center mb-2">
//         <span className="block text-sm font-medium text-gray-700 mr-2">{field.label}</span>
//         {field.required && <span className="text-red-500">*</span>}
//       </div>
//       <input
//         type="email"
//         value={value}
//         onChange={e => setValue(e.target.value)}
//         placeholder={field.placeholder || 'Enter email'}
//         className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//       />
//       {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//     </div>
//   );
// };

// export default EmailField;

import React, { useState, useEffect } from 'react';

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const EmailField = ({ field, handleFieldChange }) => {
  const [value, setValue] = useState(field.value || '');
  const [error, setError] = useState('');
  // Use fixed validation pattern for email
  const validationPattern = emailRegex;
  const validationMessage = 'Please enter a valid email address (lowercase, must contain @, and domain)';

  useEffect(() => {
    setValue(field.value || '');
  }, [field.value]);

  useEffect(() => {
    if (value && !validationPattern.test(value)) {
      setError(validationMessage);
    } else {
      setError('');
    }
  }, [value]);

  useEffect(() => {
    handleFieldChange(field.id, value);
    // eslint-disable-next-line
  }, [value]);

  return (
    <div className="p-4">
      <input
        type="email"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={field.placeholder || 'Enter email'}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default EmailField;