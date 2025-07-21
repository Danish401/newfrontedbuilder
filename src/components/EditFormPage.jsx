// src/components/EditFormPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForm, updateForm } from '../features/formSlice'; // Adjust import as necessary

const EditFormPage = () => {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  
  useEffect(() => {
    // Fetch the form data by formId
    dispatch(fetchForm(formId)).then((response) => {
      setFormData(response.payload);
    });
  }, [formId, dispatch]);

  const handleUpdateForm = () => {
    dispatch(updateForm(formData)).then(() => {
      navigate('/'); // Redirect to the list of forms or any other page
    });
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Form</h2>
      {/* Example for a text input field */}
      <label>
        Title:
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </label>
      {/* Add more fields as needed */}
      <button onClick={handleUpdateForm}>Save Changes</button>
    </div>
  );
};

export default EditFormPage;
