
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addColumn,
  addRow,
  updateColumnName,
  updateCellValue,
  updateSpreadsheetName,
  deleteColumn,
  deleteRow,
  updateSpreadsheet,
} from '../features/formSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faSquarePlus } from '@fortawesome/free-solid-svg-icons'; // Updated icons

const SpreadsheetEditor = ({ field, onClose }) => {
  const dispatch = useDispatch();
  const [spreadsheetName, setSpreadsheetName] = useState(field.label);

  const handleAddColumn = () => {
    dispatch(addColumn({ spreadsheetId: field.id }));
  };

  const handleAddRow = () => {
    dispatch(addRow({ spreadsheetId: field.id }));
  };

  const handleDeleteColumn = (index) => {
    dispatch(deleteColumn({ spreadsheetId: field.id, columnIndex: index }));
  };

  const handleDeleteRow = (rowIndex) => {
    dispatch(deleteRow({ spreadsheetId: field.id, rowIndex }));
  };

  const handleUpdateColumnName = (index, newName) => {
    dispatch(updateColumnName({ spreadsheetId: field.id, index, newName }));
  };



  const handleUpdateCellValue = (rowIndex, columnIndex, newValue) => {
    dispatch(
      updateCellValue({
        spreadsheetId: field.id,
        rowIndex,
        columnIndex,
        newValue,
      })
    );
  };

  const handleSave = () => {
    if (!field || !field.id) {
      console.error('Field is undefined or missing id');
      return;
    }

    const updatedSpreadsheet = {
      ...field,
      label: spreadsheetName,
      columns: field.columns,
      rows: field.rows,
    };

    dispatch(updateSpreadsheet({ id: field.id, updatedSpreadsheet }));
    dispatch(updateSpreadsheetName({ id: field.id, newName: spreadsheetName }));

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-300 rounded">
      <h2 className="mb-4 text-lg font-semibold">Edit Spreadsheet</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium">Spreadsheet Name</label>
        <input
          type="text"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
          value={spreadsheetName}
          onChange={(e) => setSpreadsheetName(e.target.value)}
        />
      </div>
      <div className="mb-6 flex space-x-2">
        <button
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={handleAddColumn}
        >
          <FontAwesomeIcon icon={faSquarePlus} className="mr-2" /> {/* Add Column Icon */}
          Add Column
        </button>
        <button
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={handleAddRow}
        >
          <FontAwesomeIcon icon={faSquarePlus} className="mr-2" /> {/* Add Row Icon */}
          Add Row
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-300">
            {field.columns.map((col, index) => (
              <th key={col.id} className="p-2 border">
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  value={col.name}
                  onChange={(e) => handleUpdateColumnName(index, e.target.value)}
                />
                <button
                  className="ml-2"
                  onClick={() => handleDeleteColumn(index)}
                >
                  <FontAwesomeIcon icon={faTrashCan} /> {/* Delete Column Icon */}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {field.rows.map((row, rowIndex) => (
            <tr key={row.id}>
              {row.data.map((cell, colIndex) => (
                <td key={colIndex} className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={cell}
                    onChange={(e) =>
                      handleUpdateCellValue(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
              <td className="p-2 border bg-gray-300">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteRow(rowIndex)}
                  title="Delete Row"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SpreadsheetEditor;



// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   addColumn,
//   addRow,
//   updateColumnName,
//   updateRowName,
//   updateCellValue,
//   updateSpreadsheetName,
//   deleteColumn,
//   deleteRow,
//   updateSpreadsheet,
// } from '../features/formSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

// const SpreadsheetEditor = ({ field, onClose }) => {
//   const dispatch = useDispatch();
//   const [spreadsheetName, setSpreadsheetName] = useState(field.label);

//   const handleAddColumn = () => {
//     dispatch(addColumn({ spreadsheetId: field.id }));
//   };

//   const handleAddRow = () => {
//     dispatch(addRow({ spreadsheetId: field.id }));
//   };

//   const handleDeleteColumn = (index) => {
//     dispatch(deleteColumn({ spreadsheetId: field.id, columnIndex: index }));
//   };

//   const handleDeleteRow = (rowIndex) => {
//     dispatch(deleteRow({ spreadsheetId: field.id, rowIndex }));
//   };

//   const handleUpdateColumnName = (index, newName) => {
//     dispatch(updateColumnName({ spreadsheetId: field.id, index, newName }));
//   };

//   const handleUpdateRowName = (rowIndex, newName) => {
//     dispatch(updateRowName({ spreadsheetId: field.id, rowIndex, newName }));
//   };

//   const handleUpdateCellValue = (rowIndex, columnIndex, newValue) => {
//     dispatch(
//       updateCellValue({
//         spreadsheetId: field.id,
//         rowIndex,
//         columnIndex,
//         newValue,
//       })
//     );
//   };

//   const handleSave = () => {
//     if (!field || !field.id) {
//       console.error('Field is undefined or missing id');
//       return;
//     }

//     const updatedSpreadsheet = {
//       ...field,
//       label: spreadsheetName,
//       columns: field.columns,
//       rows: field.rows,
//     };

//     dispatch(updateSpreadsheet({ id: field.id, updatedSpreadsheet }));
//     dispatch(updateSpreadsheetName({ id: field.id, newName: spreadsheetName }));

//     if (typeof onClose === 'function') {
//       onClose();
//     }
//   };

//   return (
//     <div className="p-6 bg-white border border-gray-300 rounded">
//       <h2 className="mb-4 text-lg font-semibold">Edit Spreadsheet</h2>
//       <div className="mb-6">
//         <label className="block text-sm font-medium">Spreadsheet Name</label>
//         <input
//           type="text"
//           className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
//           value={spreadsheetName}
//           onChange={(e) => setSpreadsheetName(e.target.value)}
//         />
//       </div>
//       <div className="mb-6 flex space-x-2">
//         <button
//           className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md"
//           onClick={handleAddColumn}
//         >
//           <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
//           Add Column
//         </button>
//         <button
//           className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md"
//           onClick={handleAddRow}
//         >
//           <FontAwesomeIcon icon={faSquarePlus} className="mr-2" />
//           Add Row
//         </button>
//       </div>
//       <table className="w-full border-collapse">
//         <thead>
//           <tr className="bg-gray-300">
//             {field.columns.map((col, index) => (
//               <th key={col.id} className="p-2 border">
//                 <input
//                   type="text"
//                   className="w-full p-1 border rounded"
//                   value={col.name}
//                   onChange={(e) => handleUpdateColumnName(index, e.target.value)}
//                 />
//                 <button
//                   className="ml-2"
//                   onClick={() => handleDeleteColumn(index)}
//                 >
//                   <FontAwesomeIcon icon={faTrashCan} />
//                 </button>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {field.rows.map((row, rowIndex) => (
//             <tr key={row.id}>
//               <td className="p-2 border bg-gray-300">
//                 <input
//                   type="text"
//                   className="w-full p-1 border rounded"
//                   value={row.name}
//                   onChange={(e) => handleUpdateRowName(rowIndex, e.target.value)}
//                 />
//                 <button
//                   className="ml-2"
//                   onClick={() => handleDeleteRow(rowIndex)}
//                 >
//                   <FontAwesomeIcon icon={faTrashCan} />
//                 </button>
//               </td>
//               {row.data.map((cell, colIndex) => (
//                 <td key={colIndex} className="p-2 border">
//                   <input
//                     type="text"
//                     className="w-full p-1 border rounded"
//                     value={cell}
//                     onChange={(e) =>
//                       handleUpdateCellValue(rowIndex, colIndex, e.target.value)
//                     }
//                   />
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-end mt-4">
//         <button
//           className="px-4 py-2 text-white bg-blue-500 rounded-md"
//           onClick={handleSave}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SpreadsheetEditor;
