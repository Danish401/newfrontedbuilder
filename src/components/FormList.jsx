// src/components/FormList.js
import React, { useEffect, useState } from 'react';
import { getForms } from '../api/formService';
import { useSelector } from 'react-redux';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const data = await getForms(userId);
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Forms List</h1>
      <ul>
        {forms.map((form) => (
          <li key={form._id}>
            {form.name} - {form.info}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormList;
