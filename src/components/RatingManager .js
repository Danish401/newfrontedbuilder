// import React, { useState } from 'react';
// import CustomizedRating from './CustomizedRating'; // Your existing rating component
// import RatingEditor from './RatingEditor'; // The new rating editor component
// import { useSelector } from 'react-redux';

// const RatingManager = () => {
//   const fields = useSelector((state) => state.form.fields);
//   const [activeField, setActiveField] = useState(null);

//   const handleEditClick = (field) => {
//     setActiveField(field);
//   };

//   const handleCloseEditor = () => {
//     setActiveField(null);
//   };

//   return (
//     <div>
//       {fields.map((field) => (
//         <div key={field.id}>
//           {field.type === 'rating' && (
//             <CustomizedRating field={field} />
//           )}
//           <button onClick={() => handleEditClick(field)}>Edit</button>
//         </div>
//       ))}
//       {activeField && (
//         <RatingEditor field={activeField} onClose={handleCloseEditor} />
//       )}
//     </div>
//   );
// };

// export default RatingManager;
