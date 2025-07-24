import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteForm, duplicateForm } from '../features/formSlice';
import { toast, ToastContainer } from 'react-toastify';
import ClipLoader from 'react-spinners/ClipLoader';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IoDuplicateOutline } from 'react-icons/io5';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import PreviewIcon from '@mui/icons-material/Preview';
import { motion } from 'framer-motion';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { GrOverview } from "react-icons/gr";
import { getForms } from '../api/formService';
const genoa = {
  50: '#f3faf8',
  100: '#d7f0ea',
  200: '#b0dfd6',
  300: '#80c8bd',
  400: '#56aba0',
  500: '#3c9087',
  600: '#2e736d',
  700: '#285d59',
  800: '#244b49',
  900: '#21403e',
  950: '#0f2424',
};
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const SavedForms = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);
  
  useEffect(() => {
    const fetchForms = async () => {
      try {
        setLoading(true);
        const data = await getForms(userId);
        setForms(data);
      } catch (error) {
        console.error('Error fetching forms:', error);
        toast.error('Error loading forms');
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [userId]);
  
  console.log('All forms:', forms);
  forms.forEach((form, index) => {
    const spreadsheetFields = form.fields.filter(field => field.type === 'spreadsheet');
    if (spreadsheetFields.length > 0) {
      console.log(`Form ${index} (${form.name}) has ${spreadsheetFields.length} spreadsheet fields:`, spreadsheetFields);
    }
  });

  const handleDelete = async (id) => {
    const toastId = toast(
      <div className="flex items-center gap-2">
        <ClipLoader color="#FF5733" size={24} />
        <span>Deleting form...</span>
      </div>,
      { autoClose: false }
    );
    
    try {
      await axios.delete(`${BACKEND_URL}/api/forms/${id}`);
      setForms(prevForms => prevForms.filter(form => form.id !== id));
      toast.update(toastId, {
        render: "Form deleted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error deleting form:', error);
      toast.update(toastId, {
        render: "Error deleting form",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDuplicate = async (id) => {
    const toastId = toast(
      <div className="flex items-center gap-2">
        <ClipLoader color="#36D7B7" size={24} />
        <span>Duplicating form...</span>
      </div>,
      { autoClose: false }
    );
    
    try {
      const formToDuplicate = forms.find(form => form.id === id);
      if (!formToDuplicate) {
        throw new Error('Form not found');
      }
      
      const duplicatedForm = {
        ...formToDuplicate,
        name: `${formToDuplicate.name} (Copy)`,
      };
      
      const response = await axios.post(`${BACKEND_URL}/api/forms`, duplicatedForm);
      
      setForms(prevForms => [...prevForms, response.data.newForm]);
      
      toast.update(toastId, {
        render: "Form duplicated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error duplicating form:', error);
      toast.update(toastId, {
        render: "Error duplicating form",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Form Name',
      width: 200,
      renderCell: (params) => (
        <Link to={`/form/view/${params.row.id}`} className="text-[#4B49AC] hover:underline">
          {params.value}
        </Link>
      ),
    },
    { field: 'info', headerName: 'Information', width: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 400,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Link to={`/form/view/${params.row.id}`} className="flex items-center">
            <motion.button
              className="bg-[#4B49AC] text-white mt-2 px-3 py-1 rounded-lg transition duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <VisibilityIcon className="mr-1" />
            </motion.button>
          </Link>
          <Link to={`/form/edit/${params.row.id}`} className="flex items-center">
            <motion.button
              className="bg-[#4B49AC] mt-2 text-white px-3 py-1 rounded-lg transition duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <EditNoteIcon className="mr-1" />
            </motion.button>
          </Link>
          {/* <Link to={`/form/preview/${params.row.id}`} className="flex items-center">
            <motion.button
              className="bg-[#4B49AC] mt-2 text-white px-3 py-1 rounded-lg transition duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PreviewIcon className="mr-1" />
            </motion.button>
          </Link> */}
          {/* <Link to={`/form/submit/${params.row.id}`} className="flex items-center">
            <motion.button
              className="bg-green-600 mt-2 text-white px-3 py-1 rounded-lg transition duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Submit Form"
            >
              📝
            </motion.button>
          </Link> */}
          <Link to={`/form/responses/${params.row.id}`} className="flex items-center">
            <motion.button
              className="bg-[#4B49AC] mt-2 text-white px-3 py-1 rounded-lg transition duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="View Responses"
            >
              <GrOverview className="mr-1"  />

            </motion.button>
          </Link>
          {/* <motion.button
            onClick={() => handleDuplicate(params.row.id)}
            className="bg-[#4B49AC] mt-2 text-white px-3 py-1 rounded-lg transition duration-200 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoDuplicateOutline className="mr-1" />
          </motion.button> */}
          <motion.button
            onClick={() => handleDelete(params.row.id)}
            className="bg-[#4B49AC] mt-2 text-white px-3 py-1 rounded-lg transition duration-200 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DeleteSweepIcon className="mr-1" />
          </motion.button>
        </div>
      ),
    },
  ];

  const rows = forms.map((form) => ({
    id: form.id,
    name: form.name,
    info: form.info,
  }));

  if (loading) {
    return (
      <div className="p-12 relative bg-[#E6E7FF] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ClipLoader color="#4B49AC" size={50} />
          <p className="mt-4 text-gray-600">Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: { xs: 2, md: 6 },
        position: 'relative',
        background: {
          xs: `linear-gradient(135deg, ${genoa[50]} 60%, ${genoa[200]} 100%)`,
          md: `linear-gradient(135deg, ${genoa[100]} 60%, ${genoa[300]} 100%)`,
        },
        transition: 'background 0.3s',
      }}
    >
      <Link
        to="/form/new"
        className="absolute p-2 right-4 bg-[#4B49AC] text-white px-4 py-2 rounded-lg flex items-center"
      >
        Add Order Form
      </Link>
      <h2 className="text-3xl font-bold font-serif mb-6 text-[#4B49AC]">Forms</h2>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default SavedForms;
