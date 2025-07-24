import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { processFormData, validateField, validateForm } from '../lib/utils';
import {
  addField,
  addDateField,
  addOptionGroup,
  addDropdownField,
  addFileUploadField,
  addSecretTextField,
  setActiveField,
  updateFieldValue,
  deleteField,
  saveForm,
  addOrderTitle,
  addSignatureField,
  addCheckbox,
  addCaptchaField,
  addSpreadsheet,
  updateSpreadsheet,
  addColumn,
  addRow,
  updateColumnName,

  updateCellValue,
  addTextEditor,
  updateTextEditorValue,
  addDropzoneField,
  updateDropzoneFileType,
  updateDropzoneMaxFileSize,
  setDropzoneFiles,
  addAddressField,
  updateAddressField,
  addRating,
  addDatetimeField,
  addSliderField,
  // selectDivider,
  addPhoneNumberField,
  addEmailField,
  addDivider,
  addQuestionYesNo,
  updateQuestionYesNo,
  toggleDarkMode,
  addRadioGroup,
  updateRadioGroupLabel,
  addRadioOption,
  removeRadioOption,
  addMultipleCheckbox,
  // updateFieldValues,
  addSelectField,
  addNumberField,
} from "../features/formSlice";

import { faBarsProgress } from "@fortawesome/free-solid-svg-icons";

import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

import { FaCopy } from "react-icons/fa";
import DateFieldEditor from "./DateFieldEditor";
import OptionGroupEditor from "./OptionGroupEditor";
import FileUploadEditor from "./FileUploadEditor";
import SecretTextEditor from "./SecretTextEditor";
import ActiveFieldForm from "./ActiveFieldForm";
import FieldEditor from "./FieldEditor";
import OrderTitleEditor from "./OrderTitleEditor";
import SignaturePad from "./SignaturePad";
import SingleLineEditor from "./SingleLineEditor";
import CustomSelect from "./CustomSelect";
import {
  FaCalendarAlt,
  FaFileUpload,
  FaListAlt,
  FaLock,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import FormField from "./FormField";
import OptionGroup from "./OptionGroup";
import { v4 as uuidv4 } from "uuid";
import UppyDropzone from "./UppyDropzone";
import CheckboxFieldEditor from "./CheckboxFieldEditor";
import CaptchaEditor from "./CaptchaEditor";
import SpreadsheetEditor from "./SpreadsheetEditor";
import TextEditor from "./TextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Button } from "primereact/button";
import { toast, ToastContainer } from "react-toastify";
import DividerText from "./DividerText";
import DividerEditor from "./DividerEditor";
import EmailField from "./EmailField";
import PhoneNumberField from "./PhoneNumberField";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { RiEdit2Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { VscSave } from "react-icons/vsc";
import RatingManager from "./RatingEditor";
import {
  faCheckSquare,
  faSquareCaretDown,
  faCircle,
  faRobot,
  faT,
  faCode,
  faWindowMinimize,
  faBars,
  faKey,
  faHeading,
  faSignature,
  faPlus,
  faCalendarAlt,
  faListAlt,
  faFileUpload,
  faLock,
  faTimes,
  faTable,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import DropzoneEditor from "./DropzoneEditor";
import AddressField from "./AddressField";
import AddressFieldEditor from "./AddressFieldEditor";
import DatetimePicker from "./DatetimePicker";
import CustomizedSlider from "./CustomizedSlider";
import CustomizedRating from "./CustomizedRating";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import "../index.css";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioGroupEditor from "./RadioGroupEditor";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";
import { BiSelectMultiple } from "react-icons/bi";
import RatingEditor from "./RatingEditor";
import EmailFieldEditor from "./EmailFieldEditor";
import PhoneNumberFieldEditor from "./PhoneNumberFieldEditor";
import SliderFieldEditor from "./SliderFieldEditor";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import NumberFieldEditor from "./NumberFieldEditor";
import PageBreak from "./PageBreak";
import Box from '@mui/material/Box';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FaGripVertical } from 'react-icons/fa';
import TextField from '@mui/material/TextField';

const IconButton = ({
  icon,
  label,
  iconComponent,
  onMouseEnter,
  onMouseLeave,
  isHovered,
  onClick,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center w-20 h-20 mb-6 cursor-pointer transition-transform duration-300 ease-in-out ${
        isHovered ? 'scale-110' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{ background: 'none' }}
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className={`text-3xl transition-colors duration-300 ease-in-out ${isHovered ? 'text-[#FF7EB3]' : 'text-[#6C63FF]'}`}
        />
      ) : (
        <div className={`text-3xl transition-colors duration-300 ease-in-out ${isHovered ? 'text-[#FF7EB3]' : 'text-[#6C63FF]'}`}>{iconComponent}</div>
      )}
      <div
        className={`absolute mt-12 text-sm font-medium text-[#6C63FF] bg-[#F3F4F8] rounded-md px-2 py-1 opacity-0 transition-opacity duration-300 ease-in-out ${
          isHovered ? 'opacity-100' : ''
        }`}
        style={{ boxShadow: '0 2px 8px 0 #A389F420' }}
      >
        {label}
      </div>
    </div>
  );
};

const COLOR_PALETTE = {
  50: '#fff7e6',
  100: '#ffecbd',
  200: '#ffd77e',
  300: '#ffb635',
  400: '#ff9600',
  500: '#ff7b00',
  600: '#de5600',
  700: '#b03600',
  800: '#912802',
  900: '#7a2109',
  950: '#0c0200',
};

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

const reorderFields = (fields, startIndex, endIndex) => {
  const result = Array.from(fields);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://newbackendformbuilder.onrender.com"
    : "http://localhost:5000";
const FormBuilder = () => {
  const { formId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fields = useSelector((state) => state.form.fields);
  const activeFieldId = useSelector((state) => state.form.activeFieldId);
  const [showEditor, setShowEditor] = useState(false);
  const [formName, setFormName] = useState("Survey");
  const [formInfo, setFormInfo] = useState("Description");
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoveredField, setHoveredField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Form Title");
  const [isPublic, setIsPublic] = useState(false);
  const [expirationDateTime, setExpirationDateTime] = useState("");

  const [fieldValues, setFieldValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.id] = field.value || ""; // Initialize state based on fields
      return acc;
    }, {})
  );

  const [currentPage, setCurrentPage] = useState(0);

  const splitFieldsByPage = (fields) => {
    const pages = [[]];
    fields.forEach((field) => {
      if (field.type === "pageBreak") {
        pages.push([]);
      } else {
        pages[pages.length - 1].push(field);
      }
    });
    return pages;
  };
  const pages = splitFieldsByPage(fields);
  const totalPages = pages.length;

  // Validate all fields and update validation errors
  const validateAllFields = () => {
    const errors = {};
    let isValid = true;

    fields.forEach(field => {
      const validation = validateField(field);
      if (!validation.isValid) {
        errors[field.id] = validation.error;
        isValid = false;
      }
    });

    setValidationErrors(errors);
    return { isValid, errors };
  };

  // Clear validation errors when fields change
  const clearValidationErrors = () => {
    setValidationErrors({});
    setShowValidationErrors(false);
  };

  const handleMouseEnter = (fieldName) => {
    setHoveredField(fieldName);
  };
  const isDarkMode = useSelector((state) => state.form.isDarkMode); // Get dark mode state from Redux
  const toggleTheme = () => {
    dispatch(toggleDarkMode()); // Dispatch the action to toggle dark mode
  };
  const handleMouseLeave = () => {
    setHoveredField(null);
  };
  const copyToClipboard = () => {
    const link = `${BACKEND_URL}/form/${formId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!"); // Use toast for better UX
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link.");
      });
  };

  const uploadToCloudinaryOrRaw = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Use "file" as the field name to match backend
    formData.append("upload_preset", "uploaded"); // Ensure the preset is set in your Cloudinary account

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfbtey2ld/upload", // Use the upload endpoint
        formData
      );
      return response.data.secure_url; // URL of the uploaded file
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);
  const handleSave = async () => {
    if (formName.trim() === "") {
      toast.error("Please enter a form name.");
      return;
    }

    // Validate all fields and show errors on the form
    const validation = validateAllFields();
    
    if (!validation.isValid) {
      setShowValidationErrors(true);
      
      // Show toast with summary
      const errorCount = Object.keys(validation.errors).length;
      toast.error(`${errorCount} validation error(s) found. Please fix the highlighted fields.`, {
        autoClose: 4000,
        closeOnClick: false,
        draggable: false,
      });
      
      // Scroll to first error field
      const firstErrorFieldId = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[data-field-id="${firstErrorFieldId}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    // Clear any previous validation errors
    clearValidationErrors();

    // Process fields for encryption
    const processedFields = processFormData(fields);

    const toastId = toast(
      <div className="flex items-center gap-2">
        <ClipLoader color="#36D7B7" size={24} />
        <span>Saving form data...</span>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
      }
    );

    try {
      let fileUrl = null; // Variable to hold the file URL
      if (selectedFile) {
        fileUrl = await uploadToCloudinaryOrRaw(selectedFile); // Call the new upload function
      }

      // Log spreadsheet fields specifically
      const spreadsheetFields = fields.filter(field => field.type === 'spreadsheet');
      console.log("Spreadsheet fields being saved:", spreadsheetFields);
      
      const formData = {
        id: uuidv4(),
        name: formName,
        info: formInfo,
        fields: processedFields,
        fileUrl: fileUrl || "", // Include the file URL if uploaded
        headerTitle: headerTitle,
        userId: userId || undefined, // Add userId if logged in
        isPublic: isPublic,
        expirationDateTime: expirationDateTime ? new Date(expirationDateTime).toISOString() : undefined,
      };

      console.log("Saving Form Data:", formData);

      const response = await fetch(`${BACKEND_URL}/api/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          toast.error(errorData.message || "You can create up to 3 forms for free. Please log in to create more.");
          toast.update(toastId, {
            render: errorData.message || "You can create up to 3 forms for free. Please log in to create more.",
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
          return;
        }
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      setTimeout(() => {
        // Use the form data returned from the backend (which includes the correct ID)
        dispatch(saveForm(result.newForm || formData));

        toast.update(toastId, {
          render: "Form Data saved successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        navigate("/forms");
      }, 2000);
    } catch (error) {
      console.error("Error saving form data:", error);

      setTimeout(() => {
        toast.update(toastId, {
          render: "Failed to save form data.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }, 2000);
    }
  };

  const handleAddField = (type) => {
    switch (type) {
      case "orderTitle":
        dispatch(addOrderTitle());
        break;
      case "date":
        dispatch(addDateField());
        break;
      case "optionGroup":
        dispatch(addOptionGroup());
        break;
      case "dropdown":
        dispatch(addDropdownField());
        break;
      case "fileUpload":
        dispatch(addFileUploadField());
        break;
      case "secretText":
        dispatch(addSecretTextField());
        break;
      case "signature": // Add this case for signature
        dispatch(addSignatureField());
        break;
      case "checkbox":
        dispatch(addCheckbox());
        break;
      case "spreadsheet":
        dispatch(addSpreadsheet());
        break;
      case "captcha":
        dispatch(addCaptchaField());
        break;
      case "texteditor":
        dispatch(addTextEditor());
        break;
      case "dropzone":
        dispatch(addDropzoneField());
        break;
      case "address":
        dispatch(addAddressField());
        break;
      case "rating":
        dispatch(addRating({ value: 0 }));
        break;
      case "datetime":
        dispatch(addDatetimeField());
        break;
      case "slider":
        dispatch(addSliderField());
        break;
      case "divider":
        dispatch(addDivider());
        break;

      case "email":
        dispatch(addEmailField());
        break;
      case "phoneNumber":
        dispatch(addPhoneNumberField());
        break;
      case "Radio-group":
        dispatch(addRadioGroup());
        break;
      case "MultipleCheckbox":
        dispatch(addMultipleCheckbox());
        break;
      case "select": // New case for Select component
        const selectPayload = {
          color: "neutral",
          variant: "solid",
          size: "md",
          isDisabled: false,
          placeholder: "Choose one...",
        };
        dispatch(addSelectField(selectPayload)); // Dispatching action with payload
        break;
      case "number":
        dispatch(addNumberField());
        break;
      case "pageBreak":
        dispatch({ type: 'form/addField', payload: { type: 'pageBreak', id: uuidv4() } });
        break;
      default:
        break;
    }
    setShowEditor(false);
  };

  const handleEditField = (id) => {
    dispatch(setActiveField(id));
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    dispatch(setActiveField(null));
    setShowEditor(false);
  };

  const handleDeleteField = (id) => {
    dispatch(deleteField(id));
  };

  const handleFieldChange = async (fieldId, update, type, file = null) => {
    // If update is an object (from editors), merge it into the field
    if (typeof update === "object" && update !== null && !Array.isArray(update)) {
      dispatch({
        type: "form/updateField",
        payload: { id: fieldId, ...update }
      });
      return;
    }
    // ...rest of your existing logic for value, file, etc...
    const field = fields.find(f => f.id === fieldId);
    if (field && (field.type === 'email' || field.type === 'phoneNumber')) {
      if (typeof update === 'object' && update !== null && !Array.isArray(update)) {
        dispatch({ type: 'form/updateField', payload: { id: fieldId, ...update } });
      } else {
        dispatch(updateFieldValue({ id: fieldId, value: update }));
      }
      return;
    }
    if (validationErrors[fieldId]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
    if (file && type === "fileUpload") {
      try {
        const url = await uploadToCloudinaryOrRaw(file);
        dispatch(updateFieldValue({ id: fieldId, value: url }));
      } catch (error) {
        toast.error("Failed to upload the file");
      }
      return;
    }
    if (type === "MultipleCheckbox") {
      setFieldValues((prevValues) => {
        const currentValues = prevValues[fieldId] || [];
        if (currentValues.includes(update)) {
          return {
            ...prevValues,
            [fieldId]: currentValues.filter((v) => v !== update),
          };
        } else {
          return { ...prevValues, [fieldId]: [...currentValues, update] };
        }
      });
    } else if (type === "Radio-group") {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldId]: update,
      }));
    } else {
      setFieldValues((prevValues) => ({
        ...prevValues,
        [fieldId]: update,
      }));
    }
    dispatch(updateFieldValue({ id: fieldId, value: update }));
  };

  const activeField = fields.find((field) => field.id === activeFieldId) || {};

  const addTableToPDF = (doc, fields) => {
    let rows = [];
    fields.forEach((field) => {
      if (field.type === 'pageBreak') {
        if (rows.length > 0) {
          autoTable(doc, {
            columns: [
              { header: 'Field Label', dataKey: 'label' },
              { header: 'Value', dataKey: 'value' },
            ],
            body: rows,
            startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40,
            theme: 'striped',
            styles: { cellPadding: 3, fontSize: 10, overflow: 'linebreak' },
            headStyles: { fillColor: [75, 73, 172], textColor: [255, 255, 255] },
          });
          doc.addPage();
          rows = [];
        }
      } else {
        rows.push({
          label: field.label,
          value: field.type === 'textEditor' ? field.value.replace(/(<([^>]+)>)/gi, '') : field.value,
        });
      }
    });
    if (rows.length > 0) {
      autoTable(doc, {
        columns: [
          { header: 'Field Label', dataKey: 'label' },
          { header: 'Value', dataKey: 'value' },
        ],
        body: rows,
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 40,
        theme: 'striped',
        styles: { cellPadding: 3, fontSize: 10, overflow: 'linebreak' },
        headStyles: { fillColor: [75, 73, 172], textColor: [255, 255, 255] },
      });
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newFields = reorderFields(fields, result.source.index, result.destination.index);
    // Dispatch a Redux action to update the order
    dispatch({ type: 'form/setFields', payload: newFields });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 0,
        position: 'relative',
        background: {
          xs: `linear-gradient(135deg, ${genoa[50]} 60%, ${genoa[200]} 100%)`,
          md: `linear-gradient(135deg, ${genoa[100]} 60%, ${genoa[300]} 100%)`,
        },
        transition: 'background 0.3s',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 3, md: 6 },
        }}
      >
        {/* Pastel gradient overlay */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FF7EB3]/20 via-[#A389F4]/10 to-[#698CF2]/10 pointer-events-none"></div>
        <div className="w-full max-w-6xl bg-white/90 rounded-3xl shadow-2xl p-6 md:p-12 flex flex-col md:flex-row gap-8 border border-[#E5E7EB]">
          {/* Left: Form Fields */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            {/* Editable Template Header */}
            <div className="mb-6">
              <input
                className="w-full text-4xl font-extrabold bg-transparent border-b-2 focus:outline-none transition-colors mb-2 text-center"
                style={{ color: '#4B49AC', borderColor: '#A389F4', '::placeholder': { color: '#B2F0FF' } }}
                value={headerTitle}
                onChange={e => setHeaderTitle(e.target.value)}
                placeholder="Template Header Title"
              />
            </div>
            {/* Form Title and Description */}
            <div className="mb-6">
              <input
                className="w-full text-3xl font-bold bg-transparent border-b-2 focus:outline-none transition-colors mb-2"
                style={{ color: '#6C63FF', borderColor: '#A389F4', '::placeholder': { color: '#B2F0FF' } }}
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="Form Title"
              />
              <textarea
                className="w-full text-base bg-transparent border-b focus:outline-none transition-colors resize-none"
                style={{ color: '#2D2D2D', borderColor: '#B2F0FF', '::placeholder': { color: '#B2F0FF' } }}
                value={formInfo}
                onChange={e => setFormInfo(e.target.value)}
                placeholder="Form description..."
              />
            </div>
            {/* Form Fields List */}
            <div className="flex flex-col gap-4">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="form-fields-droppable">
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {pages[currentPage].map((field, idx) => (
                        field.type === "pageBreak" ? (
                          <PageBreak key={field.id} />
                        ) : (
                          <Draggable draggableId={String(field.id)} index={idx} key={field.id}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="rounded-2xl shadow p-4 flex flex-col md:flex-row items-start md:items-center gap-4 border bg-[#F3F4F8]"
                                style={{ borderColor: '#E5E7EB', ...provided.draggableProps.style }}
                              >
                                <div {...provided.dragHandleProps} />
                                <div className="flex-1 w-full">
                                  <label 
                                    className="block text-sm font-medium mb-2"
                                    style={{
                                      fontWeight: field.isBold ? 'bold' : 'normal',
                                      fontStyle: field.isItalic ? 'italic' : 'normal',
                                      color: field.textColor || '#4B49AC'
                                    }}
                                  >
                                    {field.label}
                                    {field.required && <span className="text-red-500 ml-1">*</span>}
                                  </label>

                                  {field.type === "optionGroup" || field.type === "dropdown" ? (
                                    <select
                                      className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F9F9F9] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                                      value={fieldValues[field.id]}
                                      onChange={(e) =>
                                        handleFieldChange(field.id, e.target.value)
                                      }
                                    >
                                      {field.options.map((option) => (
                                        <option key={option.id} value={option.value}>
                                          {option.value}
                                        </option>
                                      ))}
                                    </select>
                                  ) : field.type === "Radio-group" ? (
                                    <div className="flex mt-2 space-x-4">
                                      {field.options.map((option) => (
                                        <label key={option.id} className="flex items-center">
                                          <input
                                            type="radio"
                                            className="form-radio text-[#7DA0FA] focus:ring-[#7DA0FA]"
                                            value={option.value}
                                            checked={fieldValues[field.id] === option.value}
                                            onChange={
                                              () =>
                                                handleFieldChange(
                                                  field.id,
                                                  option.value,
                                                  field.type
                                                ) // Pass type
                                            }
                                          />
                                          <span className="ml-2 text-[#4B49AC]">
                                            {option.value}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : field.type === "MultipleCheckbox" ? (
                                    <div className="flex flex-wrap space-x-4">
                                      {field.options.map((option) => (
                                        <label key={option.id} className="flex items-center">
                                          <input
                                            type="checkbox"
                                            className="form-checkbox text-[#7DA0FA] focus:ring-[#7DA0FA]"
                                            value={option.value}
                                            checked={
                                              fieldValues[field.id]?.includes(option.value) ||
                                              false
                                            }
                                            onChange={() =>
                                              handleFieldChange(
                                                field.id,
                                                option.value,
                                                field.type
                                              )
                                            } // Pass type
                                          />
                                          <span className="ml-2 text-[#4B49AC]">
                                            {option.value}
                                          </span>
                                        </label>
                                      ))}
                                    </div>
                                  ) : field.type === "select" ? (
                                    <CustomSelect field={field} />
                                  ) : /* field.type === "dropzone" ? (
                                    <UppyDropzone key={field.id} field={field} />
                                  ) : */ field.type === "datetime" ? (
                                    <DatetimePicker key={field.id} field={field} />
                                  ) : field.type === "phoneNumber" ? (
                                    <PhoneNumberField
                                      key={field.id}
                                      field={field}
                                      handleFieldChange={handleFieldChange}
                                    />
                                  ) : field.type === "email" ? (
                                    <EmailField
                                      key={field.id}
                                      field={field}
                                      handleFieldChange={handleFieldChange}
                                    />
                                  ) : field.type === "slider" ? (
                                    <CustomizedSlider field={field} />
                                  ) : field.type === "divider" ? (
                                    <DividerText key={field.id} field={field} />
                                  ) : field.type === "rating" ? (
                                    <CustomizedRating
                                      key={field.id}
                                      field={field}
                                    />
                                  ) : field.type === "fileUpload" ? (
                                    <input
                                      type="file"
                                      onChange={(e) =>
                                        handleFieldChange(
                                          field.id,
                                          null,
                                          field.type,
                                          e.target.files[0]
                                        )
                                      } // Pass the file correctly
                                    />
                                  ) : field.type === "secretText" ? (
                                    <textarea
                                      rows="3"
                                      className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F9F9F9] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                                      value={field.value}
                                      placeholder={field.placeholder}
                                      onChange={(e) =>
                                        handleFieldChange(field.id, e.target.value)
                                      }
                                    />
                                  ) : field.type === "address" ? (
                                    <AddressField id={field.id} />
                                  ) : field.type === "signature" ? (
                                    <SignaturePad
                                      field={field}
                                      onSave={(signature) =>
                                        handleFieldChange(field.id, signature)
                                      }
                                    />
                                  ) : field.type === "texteditor" ? (
                                    <TextEditor
                                      id={field.id} // Pass the id for reference
                                      value={field.value || ""} // Bind the value from Redux
                                      label={field.label} // Bind the label from Redux
                                    />
                                  ) : /* field.type === "captcha" ? (
                                    <CaptchaEditor
                                      key={field.id} // Pass the id for reference
                                      id={field.id}
                                      value={field.value || ""} // Bind the value from Redux
                                      captchaText={field.captchaText} // Pass the generated captcha text
                                      onChange={(newValue) =>
                                        handleFieldChange(field.id, newValue)
                                      } // Update Redux on change
                                    />
                                  ) : */ field.type === "spreadsheet" ? (
                                    <FormField
                                      key={field.id}
                                      field={field}
                                      handleFieldChange={handleFieldChange}
                                      handleDeleteField={handleDeleteField}
                                      handleEditField={handleEditField}
                                    />
                                  ) : field.type === "orderTitle" || field.type === "text" ? (
                                    <div>
                                      <input
                                        type="text"
                                        className={`mt-1 block w-full border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out ${
                                          showValidationErrors && validationErrors[field.id]
                                            ? 'border-red-500'
                                            : 'border-[#4B49AC]'
                                        }`}
                                        value={field.value || ''}
                                        placeholder={field.placeholder || ''}
                                        maxLength={field.maxLength || undefined}
                                        required={field.required || false}
                                        style={{
                                          fontWeight: field.isBold ? 'bold' : 'normal',
                                          fontStyle: field.isItalic ? 'italic' : 'normal',
                                          color: field.textColor || '#374151',
                                        }}
                                        onChange={(e) => {
                                          let value = e.target.value;
                                          if (field.maxLength && value.length > field.maxLength) {
                                            value = value.slice(0, field.maxLength);
                                          }
                                          handleFieldChange(field.id, value);
                                        }}
                                      />
                                      {/* Character Counter */}
                                      {field.maxLength && (
                                        <div className={`text-xs mt-1 ${field.value && field.value.length > field.maxLength ? 'text-red-500' : 'text-gray-500'}`}>
                                          {field.value ? field.value.length : 0} / {field.maxLength} characters
                                          {field.value && field.value.length > field.maxLength && (
                                            <span className="ml-2">⚠️ Character limit exceeded</span>
                                          )}
                                        </div>
                                      )}
                                      {/* Required Error */}
                                      {showValidationErrors && validationErrors[field.id] && (
                                        <div className="text-red-500 text-xs mt-1 flex items-center">
                                          <span className="mr-1">⚠️</span>
                                          {validationErrors[field.id]}
                                        </div>
                                      )}
                                    </div>
                                  ) : field.type === "checkbox" ? (
                                    <label className="flex items-center">
                                      <input
                                        type="checkbox"
                                        className="form-checkbox text-[#4B49AC] border-2 border-[#4B49AC] rounded-md focus:ring-[#7DA0FA] transition-colors duration-300 ease-in-out"
                                        checked={field.checked}
                                        onChange={(e) =>
                                          handleFieldChange(field.id, e.target.checked)
                                        }
                                      />
                                      <span className="ml-2 text-gray-700">{field.label}</span>
                                    </label>
                                  ) : field.type === "number" ? (
                                    <div>
                                      <input
                                        type="number"
                                        className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F9F9F9] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                                        value={fieldValues[field.id]}
                                        required={field.required}
                                        placeholder={field.placeholder}
                                        step={field.decimal ? "any" : "1"}
                                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                      />
                                      {field.required && !fieldValues[field.id] && (
                                        <div className="text-red-500 text-xs mt-1">This field is required</div>
                                      )}
                                    </div>
                                  ) : (
                                    <input
                                      type={field.type === "date" ? "date" : "text"}
                                      className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F9F9F9] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                                      value={field.value}
                                      placeholder={field.placeholder}
                                      onChange={(e) =>
                                        handleFieldChange(field.id, e.target.value)
                                      }
                                    />
                                  )}
                                  
                                  {/* Validation Error Display */}
                                  {showValidationErrors && validationErrors[field.id] && (
                                    <div className="text-red-500 text-sm mt-2 flex items-center">
                                      <span className="mr-1">⚠️</span>
                                      {validationErrors[field.id]}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-row gap-2 mt-2 sm:mt-0">
                                    <button
                                    className="bg-[#ffb635] hover:bg-[#ff9600] text-white px-3 py-2 rounded-lg flex items-center shadow transition-colors duration-200"
                                      onClick={() => handleEditField(field.id)}
                                    aria-label="Edit field"
                                    >
                                    <RiEdit2Line className="mr-1" />
                                    </button>
                                    <button
                                    className="bg-[#de5600] hover:bg-[#b03600] text-white px-3 py-2 rounded-lg flex items-center shadow transition-colors duration-200"
                                      onClick={() => handleDeleteField(field.id)}
                                    aria-label="Delete field"
                                    >
                                    <TiDeleteOutline className="mr-1" />
                                    </button>
                              </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              </div>
              {/* Page navigation */}
              <div className="flex justify-between mt-4">
                <button
                  className="font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
                  style={{ background: '#A389F4', color: '#fff' }}
                  onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                >
                  Previous
                </button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button
                  className="font-semibold px-4 py-2 rounded-xl shadow-lg transition-all duration-300"
                  style={{ background: '#A389F4', color: '#fff' }}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </div>
              {/* Save Button */}
              <div className="flex justify-end mt-4">
                <button
                  className="font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2"
                  style={{ background: 'linear-gradient(90deg, #FF7EB3 0%, #A389F4 50%, #698CF2 100%)', color: '#fff', boxShadow: '0 4px 16px 0 #A389F420' }}
                  onClick={handleSave}
                >
                  <VscSave className="text-xl" /> Save Form
                </button>
            </div>
          </div>
          {/* Right: Field Add/Edit Panel */}
          <div className="w-full md:w-1/2 rounded-2xl shadow-lg p-6 flex flex-col gap-6 border" style={{ background: '#E5E7EB', borderColor: '#B2F0FF' }}>
            {/* Close Button */}
            <button
              className="self-end rounded-full w-10 h-10 flex items-center justify-center shadow transition-colors"
              style={{ color: '#A389F4', background: '#FFFFFF', boxShadow: '0 2px 8px 0 #A389F420' }}
              onClick={handleCloseEditor}
            >
              <FaTimes />
            </button>
            {!showEditor ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* IconButton palette update */}
                {[
                  { icon: faHeading, label: 'Order Title', type: 'orderTitle' },
                  { icon: faCalendarAlt, label: 'Date', type: 'date' },
                  { icon: faCircle, label: 'Option Group', type: 'optionGroup' },
                  { icon: faSquareCaretDown, label: 'Dropdown', type: 'dropdown' },
                  { icon: faFileUpload, label: 'File Upload', type: 'fileUpload' },
                  { icon: faKey, label: 'Secret Text', type: 'secretText' },
                  { icon: faSignature, label: 'Signature', type: 'signature' },
                  { icon: faCheckSquare, label: 'Checkbox', type: 'checkbox' },
                  { icon: faWindowMinimize, label: 'Single Line', type: 'orderTitle' },
                  { icon: faT, label: 'Formatted Text', type: 'orderTitle' },
                  { icon: faBars, label: 'Multiple Lines', type: 'orderTitle' },
                  { icon: faTable, label: 'Spreadsheet', type: 'spreadsheet' },
                  /* { icon: faRobot, label: 'Captcha', type: 'captcha' }, */
                  { icon: faCode, label: 'Editor', type: 'texteditor' },
                  { iconComponent: <MyLocationOutlinedIcon />, label: 'Address', type: 'address' },
                  /* { iconComponent: <FolderOutlinedIcon />, label: 'Dropzone', type: 'dropzone' }, */
                  { iconComponent: <StarBorderIcon />, label: 'Rating', type: 'rating' },
                  { iconComponent: <EventAvailableIcon />, label: 'DateTime', type: 'datetime' },
                  { iconComponent: <HorizontalRuleOutlinedIcon />, label: 'Divider', type: 'divider' },
                  { iconComponent: <DraftsOutlinedIcon />, label: 'Email', type: 'email' },
                  { iconComponent: <PhoneEnabledOutlinedIcon />, label: 'Phone Number', type: 'phoneNumber' },
                  { iconComponent: <RadioButtonCheckedIcon />, label: 'Radio', type: 'Radio-group' },
                  { iconComponent: <BiSelectMultiple />, label: 'Select Multiple', type: 'MultipleCheckbox' },
                  { iconComponent: <FontAwesomeIcon icon={faBarsProgress} />, label: 'Progress', type: 'slider' },
                  { iconComponent: <FontAwesomeIcon icon={faHashtag} />, label: 'Number', type: 'number' },
                  { iconComponent: <hr style={{width:'24px',borderTop:'2px dashed #bbb'}} />, label: 'Page Break', type: 'pageBreak' },
                ].map((item, idx) => (
                <IconButton
                    key={item.label}
                    icon={item.icon}
                    iconComponent={item.iconComponent}
                    label={item.label}
                    onMouseEnter={() => handleMouseEnter(item.type)}
                  onMouseLeave={handleMouseLeave}
                    isHovered={hoveredField === item.type}
                    onClick={() => handleAddField(item.type)}
                  />
                ))}
              </div>
            ) : (
              <div>
                {activeField.type === "date" && (
                  <DateFieldEditor field={activeField} />
                )}
                {activeField.type === "optionGroup" && (
                  <OptionGroupEditor field={activeField} />
                )}
                {activeField.type === "Radio-group" && (
                  <RadioGroupEditor field={activeField} />
                )}
                {activeField.type === "MultipleCheckbox" && (
                  <MultipleSelectCheckmarks field={activeField} />
                )}
                {activeField.type === "fileUpload" && (
                  <FileUploadEditor field={activeField} />
                )}
                {activeField.type === "secretText" && (
                  <SecretTextEditor field={activeField} />
                )}
                {activeField.type === "dropdown" && (
                  <OptionGroup field={activeField} />
                )}
                {activeField.type === "orderTitle" && (
                  <OrderTitleEditor field={activeField} />
                )}
                {activeField.type === "signature" && (
                  <SignaturePad
                    field={activeField}
                    onSave={(signature) =>
                      handleFieldChange(activeField.id, signature)
                    }
                  />
                )}{" "}
                {activeField.type === "checkbox" && (
                  <CheckboxFieldEditor field={activeField} />
                )}
                {activeField.type === "spreadsheet" && (
                  <SpreadsheetEditor
                    field={activeField}
                    onSave={(spreadsheet) =>
                      handleFieldChange(activeField.id, spreadsheet)
                    }
                  />
                )}
                {activeField.type === "slider" && (
                  <SliderFieldEditor
                    field={activeField}
                    onClose={handleCloseEditor}
                    handleFieldChange={handleFieldChange}
                  />
                )}
                {activeField.type === "address" && (
                  <AddressFieldEditor 
                    field={activeField} 
                    onClose={handleCloseEditor}
                  />
                )}
                {activeField.type === "email" && (
                  <EmailFieldEditor 
                    field={activeField} 
                    onChange={handleFieldChange}
                    onClose={handleCloseEditor}
                  />
                )}
                {activeField.type === "phoneNumber" && (
                  <PhoneNumberFieldEditor 
                    field={activeField} 
                    onChange={handleFieldChange}
                    onClose={handleCloseEditor}
                  />
                )}
                {activeField.type === "divider" && (
                  <DividerEditor 
                    field={activeField} 
                    onClose={handleCloseEditor}
                  />
                )}
                {activeField.type === "number" && (
                  <NumberFieldEditor
                    field={activeField}
                    onChange={handleFieldChange}
                    onClose={handleCloseEditor}
                  />
                )}
                {activeField.type === "rating" && (
                  <RatingEditor
                    field={activeField}
                    onClose={handleCloseEditor}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </Box>
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default FormBuilder;
