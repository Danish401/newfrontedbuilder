// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteForm } from '../features/formSlice';
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const C1 = () => {
//   const dispatch = useDispatch();
//   const savedForms = useSelector((state) => state.form.savedForms);

//   const handleDeleteForm = (id) => {
//     dispatch(deleteForm(id));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Saved Forms</h1>
//       <ul>
//         {savedForms.map((form) => (
//           <li key={form.id} className="mb-4 p-4 border rounded-lg">
//             <h2 className="text-xl font-semibold">{form.id}</h2>
//             <Link to={`/form/${form.id}`} className="text-blue-600 hover:underline">View Form</Link>
//             <button
//               className="ml-4 text-red-600 hover:underline"
//               onClick={() => handleDeleteForm(form.id)}
//             >
//               <FaTrash className="mr-2" /> Delete
//             </button>
//             {/* Add an edit functionality if needed */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default C1;



//edt
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteForm } from '../features/formSlice';
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const C1 = () => {
//   const dispatch = useDispatch();
//   const savedForms = useSelector((state) => state.form.savedForms);

//   const handleDeleteForm = (id) => {
//     dispatch(deleteForm(id));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4"> Forms</h1>
//       <ul>
//         {savedForms.map((form) => (
//           <li key={form.id} className="mb-4 p-4 border rounded-lg">
//             <h2 className="text-xl font-semibold">{form.id}</h2>
//             <Link to={`/form/${form.id}`} className="text-blue-600 hover:underline">View Form</Link>
//             <Link
//               to={`/form/${form.id}`}
//               className="ml-4 text-green-600 hover:underline"
//               state={{ editing: true }}
//             >
//               <FaEdit className="mr-2" /> Edit
//             </Link>
//             <button
//               className="ml-4 text-red-600 hover:underline"
//               onClick={() => handleDeleteForm(form.id)}
//             >
//               <FaTrash className="mr-2" /> Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default C1;


// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { deleteForm } from '../features/formSlice';
// import { FaTrash, FaEdit } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const C1 = () => {
//   const dispatch = useDispatch();
//   const savedForms = useSelector((state) => state.form.savedForms);

//   const handleDeleteForm = (id) => {
//     dispatch(deleteForm(id));
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Saved Forms</h1>
//       <ul>
//         {savedForms.map((form) => (
//           <li key={form.id} className="mb-4 p-4 border rounded-lg">
//             <h2 className="text-xl font-semibold">{form.id}</h2>
//             <Link to={`/form/${form.id}`} className="text-blue-600 hover:underline">View Form</Link>
//             <Link
//               to={`/form/${form.id}`}
//               className="ml-4 text-green-600 hover:underline"
//               state={{ editing: true }}
//             >
//               <FaEdit className="mr-2" /> Edit
//             </Link>
//             <button
//               className="ml-4 text-red-600 hover:underline"
//               onClick={() => handleDeleteForm(form.id)}
//             >
//               <FaTrash className="mr-2" /> Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default C1;
