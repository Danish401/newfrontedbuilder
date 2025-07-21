// SavedData.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { deleteField } from "../features/formSlice";
import { useHistory } from "react-router-dom";

const SavedData = () => {
  const fields = useSelector((state) => state.form.fields);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleEdit = (id) => {
    // Implement your edit logic here
    history.push(`/edit-field/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteField(id));
  };

  return (
    <div>
      <h1>Saved Data</h1>
      <ul>
        {fields.map((field) => (
          <li key={field.id} className="flex justify-between items-center">
            <div>
              <h2>{field.label}</h2>
              <p>Type: {field.type}</p>
              <p>Value: {field.value}</p>
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedData;
