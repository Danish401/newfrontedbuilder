import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteField } from "../features/formSlice";
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListView = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);

  const handleDeleteField = (id) => {
    dispatch(deleteField(id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Form Fields List</h1>
      <ul>
        {fields.map((field) => (
          <li key={field.id} className="mb-4 p-4 border rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-medium">{field.label}</h2>
              <p className="text-gray-600">Type: {field.type}</p>
            </div>
            <div>
              <Link
                to={`/edit-field/${field.id}`}
                className="text-cyan-800 mr-2 px-4 py-2 border rounded-lg flex items-center"
              >
                <FaEdit className="mr-2" /> Edit
              </Link>
              <button
                className="text-gray-800 px-4 py-2 border rounded-lg flex items-center"
                onClick={() => handleDeleteField(field.id)}
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

export default ListView;
