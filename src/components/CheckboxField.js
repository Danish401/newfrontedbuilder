// // src/components/CheckboxField.js
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { updateField, setActiveField } from '../features/formSlice';

// const CheckboxField = ({ field }) => {
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     dispatch(
//       updateField({
//         id: field.id,
//         label: e.target.value,
//       })
//     );
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-sm font-medium text-gray-900">Field Name</label>
//       <input
//         type="text"
//         className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
//         value={field.label}
//         onChange={handleChange}
//       />
//     </div>
//   );
// };

// export default CheckboxField;
