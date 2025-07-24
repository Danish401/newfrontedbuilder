// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/Header";
import Home from "./components/Home";
import FormBuilder from "./components/FormBuilder";
import SavedForms from "./components/SavedForms";
import ViewForm from "./components/ViewForm";
import EditForm from "./components/EditForm";
import DuplicateForm from "./components/DuplicateForm";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import TabNavigator from "./components/TabNavigator"; // Import the new TabNavigator
import './index.css'; // Import the CSS file
import Preview from "./components/Preview";
import ForgotPassword from "./components/ForgotPassword";
import FormSubmission from "./components/FormSubmission";
import FormResponses from "./components/FormResponses";
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { saveForm, clearForms } from './features/formSlice';
import axios from 'axios';
import PublicTemplate2Form from "./components/PublicTemplate2Form";
import ForceTemplate2Submission from "./components/ForceTemplate2Submission";
import ForceTemplateSubmission from "./components/ForceTemplateSubmission";
// import About from "./components/About";
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
// Component to sync forms with backend
const FormSync = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const syncForms = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/forms`);
        // Clear existing forms first
        dispatch(clearForms());
        // Add all forms from backend
        response.data.forEach(form => {
          dispatch(saveForm(form));
        });
      } catch (error) {
        console.error('Error syncing forms:', error);
      }
    };

    syncForms();
  }, [dispatch]);

  return null;
};

function AppContent({ isDarkMode, setIsDarkMode }) {
  const location = useLocation();
  // Hide header for public template share links
  const hideHeader =
    location.pathname.startsWith('/form/submit/') ||
    location.pathname.startsWith('/form/public/');

  return (
    <>
      {!hideHeader && <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      <div className={`pt-16 ${isDarkMode ? 'dark' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form/new" element={<FormBuilder />} />
          <Route path="/forms" element={<SavedForms />} />
          <Route path="/form/view/:formId" element={<ViewForm />} />
          <Route path="/form/preview/:formId" element={<Preview />} />
          <Route path="/form/edit/:formId" element={<EditForm />} />
          <Route path="/form/duplicate/:formId" element={<DuplicateForm />} />
          <Route path="/form/submit/:formId" element={<FormSubmission />} />
          <Route path="/form/responses/:formId" element={<FormResponses />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/form/public/template2" element={<PublicTemplate2Form />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/form/submit/templateid2/:formId" element={<ForceTemplateSubmission templateNumber={2} />} />
          <Route path="/form/submit/templateid3/:formId" element={<ForceTemplateSubmission templateNumber={3} />} />
          <Route path="/form/submit/templateid4/:formId" element={<ForceTemplateSubmission templateNumber={4} />} />
          <Route path="/form/submit/templateid5/:formId" element={<ForceTemplateSubmission templateNumber={5} />} />
          <Route path="/form/submit/templateid6/:formId" element={<ForceTemplateSubmission templateNumber={6} />} />
          <Route path="/form/submit/templateid7/:formId" element={<ForceTemplateSubmission templateNumber={7} />} />
          <Route path="/form/submit/templateid8/:formId" element={<ForceTemplateSubmission templateNumber={8} />} />
          <Route path="/form/submit/templateid9/:formId" element={<ForceTemplateSubmission templateNumber={9} />} />
          <Route path="/form/submit/templateid10/:formId" element={<ForceTemplateSubmission templateNumber={10} />} />
          <Route path="/form/submit/templateid11/:formId" element={<ForceTemplateSubmission templateNumber={11} />} />
          <Route path="/form/submit/templateid12/:formId" element={<ForceTemplateSubmission templateNumber={12} />} />
          <Route path="/form/submit/templateid13/:formId" element={<ForceTemplateSubmission templateNumber={13} />} />
          <Route path="/form/submit/templateid14/:formId" element={<ForceTemplateSubmission templateNumber={14} />} />
          <Route path="/form/submit/templateid15/:formId" element={<ForceTemplateSubmission templateNumber={15} />} />
          <Route path="/form/submit/templateid16/:formId" element={<ForceTemplateSubmission templateNumber={16} />} />
          <Route path="/form/submit/templateid17/:formId" element={<ForceTemplateSubmission templateNumber={17} />} />
          <Route path="/form/submit/templateid18/:formId" element={<ForceTemplateSubmission templateNumber={18} />} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  // Use effect to set body class
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <FormSync />
        <Router>
          <AppContent isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
