// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteField, setActiveField } from '../features/formSlice';
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const SavedFieldsList = () => {
//   const dispatch = useDispatch();
//   const savedFields = useSelector((state) => state.form.savedFields);

//   const handleEdit = (id) => {
//     dispatch(setActiveField(id));
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteField(id));
//   };

//   return (
//     <div>
//       <h2>Saved Fields</h2>
//       {savedFields.map((field) => (
//         <div key={field.id} className="mb-4 p-2 border rounded">
//           <label className="block text-sm font-medium text-gray-700">{field.label}</label>
//           {/* Render field based on its type */}
//           {field.type === 'optionGroup' || field.type === 'dropdown' ? (
//             <select className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm">
//               {field.options.map((option) => (
//                 <option key={option.id} value={option.value}>
//                   {option.value}
//                 </option>
//               ))}
//             </select>
//           ) : field.type === 'file' ? (
//             <input
//               type="file"
//               className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm"
//             />
//           ) : field.type === 'secretText' ? (
//             <textarea
//               rows="3"
//               className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm"
//               value={field.value}
//               readOnly
//             />
//           ) : (
//             <input
//               type={field.type === 'date' ? 'date' : 'text'}
//               className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm"
//               value={field.value}
//               readOnly
//             />
//           )}
//           <div className="mt-2">
//             <button
//               className="mr-2 px-4 py-2 border rounded-lg flex items-center"
//               onClick={() => handleEdit(field.id)}
//             >
//               <FaEdit className="mr-2" /> Edit
//             </button>
//             <button
//               className="px-4 py-2 border rounded-lg flex items-center"
//               onClick={() => handleDelete(field.id)}
//             >
//               <FaTrash className="mr-2" /> Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SavedFieldsList;


// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteSavedField } from "../features/formSlice";
// import { FaEdit, FaTrash } from 'react-icons/fa';

// const SavedFields = () => {
//   const dispatch = useDispatch();
//   const savedFields = useSelector((state) => state.form.savedFields);

//   const handleEditSavedField = (id) => {
//     // Logic to edit saved field
//   };

//   const handleDeleteSavedField = (id) => {
//     dispatch(deleteSavedField(id));
//   };

//   return (
//     <div className="w-full p-4 border">
//       <h2 className="text-xl font-bold mb-4">Saved Fields</h2>
//       {savedFields.map((field) => (
//         <div key={field.id} className="mb-4">
//           <div className="flex justify-between items-center">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 {field.label}
//               </label>
//               <input
//                 type={field.type === "date" ? "date" : "text"}
//                 className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm"
//                 value={field.value}
//                 readOnly
//               />
//             </div>
//             <div>
//               <button
//                 className="text-cyan-800 mr-2 px-4 py-2 border rounded-lg flex items-center"
//                 onClick={() => handleEditSavedField(field.id)}
//               >
//                 <FaEdit className="mr-2" /> Edit
//               </button>
//               <button
//                 className="text-gray-800 px-4 py-2 border rounded-lg flex items-center"
//                 onClick={() => handleDeleteSavedField(field.id)}
//               >
//                 <FaTrash className="mr-2" /> Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SavedFields;


// src/components/SavedFields.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSavedField, updateField } from '../features/formSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SavedFields = () => {
  const dispatch = useDispatch();
  const savedFields = useSelector(state => state.form.savedFields);

  const handleDelete = (id) => {
    dispatch(deleteSavedField(id));
  };

  const handleEdit = (id) => {
    // Logic to edit saved field, you might want to display it in a form or editor
    // For now, we'll simply log the ID
    console.log('Edit field with ID:', id);
  };

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Saved Fields</h2>
      {savedFields.length > 0 ? (
        savedFields.map(field => (
          <div key={field.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm"
                  value={field.value}
                  readOnly
                />
              </div>
              <div>
                <button
                  className="text-cyan-800 mr-2 px-4 py-2 border rounded-lg flex items-center"
                  onClick={() => handleEdit(field.id)}
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  className="text-gray-800 px-4 py-2 border rounded-lg flex items-center"
                  onClick={() => handleDelete(field.id)}
                >
                  <FaTrash className="mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No saved fields available.</p>
      )}
    </div>
  );
};

export default SavedFields;

