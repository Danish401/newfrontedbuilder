


import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { updateFieldValue } from "../features/formSlice";

const EditField = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const fields = useSelector((state) => state.form.fields);
  const field = fields.find((field) => field.id === id);

  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    if (field) {
      setLabel(field.label || "");
      setValue(field.value || "");
    }
  }, [field]);

  const handleSave = () => {
    dispatch(updateFieldValue({ id, label, value }));
    history.push("/saved-data");
  };

  if (!field) {
    return <div className="text-red-500">Field not found</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-[#E5E5E5]">
      <h1 className="text-2xl font-bold mb-4 text-[#4B49AC]">Edit Field</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Label:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="mt-1 block w-full border-2 border-[#E5E5E5] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300 p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">Value:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block w-full border-2 border-[#E5E5E5] rounded-md shadow-sm focus:border-[#7DA0FA] hover:border-[#98BDFF] transition-colors duration-300 p-2"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#4B49AC] text-white px-4 py-2 rounded-md hover:bg-[#3D3A8C] focus:outline-none focus:ring-2 focus:ring-[#7DA0FA] transition-colors duration-300"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => history.push("/saved-data")}
            className="bg-[#F3797E] text-white px-4 py-2 rounded-md hover:bg-[#E74C3C] focus:outline-none focus:ring-2 focus:ring-[#F3797E] transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditField;
