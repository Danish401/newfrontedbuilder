import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSavedField } from '../features/formSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SavedFormsList = () => {
  const dispatch = useDispatch();
  const savedFields = useSelector((state) => state.form.savedFields);
  const [editMode, setEditMode] = React.useState(null);
  const [editValue, setEditValue] = React.useState('');

  const handleDelete = (id) => {
    dispatch(deleteSavedField(id));
  };

  const handleEditClick = (field) => {
    setEditMode(field.id);
    setEditValue(field.value);
  };

  const handleSaveEdit = (id) => {
    dispatch(updateSavedField({ id, value: editValue }));
    setEditMode(null);
  };

  return (
    <div className="p-4 border-l">
      <h2 className="text-xl font-bold mb-4">Forms</h2>
      {savedFields.length > 0 ? (
        savedFields.map((field) => (
          <div key={field.id} className="mb-4">
            {editMode === field.id ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="mt-1 block w-full border-gray-800 border-2 rounded-md shadow-sm"
                />
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleSaveEdit(field.id)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
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
                    onClick={() => handleEditClick(field)}
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
            )}
          </div>
        ))
      ) : (
        <p>No saved forms available.</p>
      )}
    </div>
  );
};

export default SavedFormsList;



