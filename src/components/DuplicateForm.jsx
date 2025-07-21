

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique IDs
import { saveForm } from '../features/formSlice';

const DuplicateForm = () => {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get the form to duplicate
  const form = useSelector((state) =>
    state.form.savedForms.find((form) => form.id === formId)
  );

  // Get existing forms for name duplication
  const existingForms = useSelector((state) =>
    state.form.savedForms.filter((savedForm) =>
      savedForm.name.startsWith(form ? form.name.replace(/\d+$/, '') : '')
    )
  );

  const handleDuplicate = () => {
    if (form) {
      // Calculate the new name by finding the highest number suffix
      const baseName = form.name.replace(/\d+$/, '');
      const numberSuffixes = existingForms
        .map((existingForm) => {
          const match = existingForm.name.match(/(\d+)$/);
          return match ? parseInt(match[1], 10) : 0;
        })
        .sort((a, b) => b - a);

      const newName = `${baseName}${numberSuffixes.length > 0 ? numberSuffixes[0] + 1 : 1}`;

      const newForm = {
        ...form,
        id: uuidv4(), // Generate a new ID
        name: newName, // Update the name
      };

      dispatch(saveForm(newForm));
      navigate('/forms'); // Redirect to the list of saved forms
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Duplicate Form</h2>
      <button onClick={handleDuplicate} className="bg-blue-500 text-white p-2 rounded-lg">
        Duplicate Form
      </button>
    </div>
  );
};

export default DuplicateForm;
