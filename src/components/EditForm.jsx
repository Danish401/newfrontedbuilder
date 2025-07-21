import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
} from "../features/formSlice";
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
import EmailField from "./EmailField";
import PhoneNumberField from "./PhoneNumberField";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { RiEdit2Line } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { VscSave } from "react-icons/vsc";
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
import { isValidPhoneNumber } from 'react-phone-number-input';
import { formatPhoneNumberIntl, parsePhoneNumber } from 'react-phone-number-input';
import SliderFieldEditor from "./SliderFieldEditor";
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
        isHovered ? "scale-110" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick} // Click event
    >
      {icon ? (
        <FontAwesomeIcon
          icon={icon}
          className="text-3xl text-[#4B49AC] hover:text-[#CBCDFF] transition-colors duration-300 ease-in-out"
        />
      ) : (
        <div className="text-3xl text-[#4B49AC] hover:text-[#CBCDFF] transition-colors duration-300 ease-in-out">
          {iconComponent}
        </div>
      )}
      <div
        className={`absolute mt-12 text-sm font-medium text-[#404040] bg-[#CBCDFF] rounded-md px-2 py-1 opacity-0 transition-opacity duration-300 ease-in-out ${
          isHovered ? "opacity-100" : ""
        }`}
      >
        {label}
      </div>
    </div>
  );
};
const EditForm = () => {
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
  const [newFields, setNewFields] = useState([]);
  const savedForms = useSelector((state) => state.form.savedForms);
  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);
  const [isPublic, setIsPublic] = useState(false);
  const [expirationDateTime, setExpirationDateTime] = useState("");

  // const [imagePreview, setImagePreview] = useState(null);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setImagePreview(URL.createObjectURL(file)); // Display image preview
  //   }
  // };

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
    const link = `http://localhost:3000/form/${formId}`;
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

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploaded"); // Set this value in your Cloudinary account

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfbtey2ld/image/upload",
        formData
      );
      return response.data.secure_url; // URL of the uploaded image
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
  useEffect(() => {
    const form = savedForms.find((form) => form.id === formId);
    if (form) {
      setFormName(form.name);
      setFormInfo(form.info);
      setIsPublic(form.isPublic || false);
      setExpirationDateTime(form.expirationDateTime ? new Date(form.expirationDateTime).toISOString().slice(0, 16) : "");
      // Load fields if necessary, if using a separate state for fields
      // Here, you may want to dispatch an action to set fields if needed
    }
  }, [formId, savedForms]);
  const handleSave = () => {
    // Check if formName is not empty
    if (formName.trim() === "") {
      toast.error("Please enter a form name.");
      return;
    }

    // Show a loading toast
    const toastId = toast(
      <div className="flex items-center gap-2">
        <ClipLoader color="#36D7B7" size={24} />
        <span>{formId ? "Updating form data..." : "Saving form data..."}</span>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        progress: undefined,
      }
    );

    // Prepare the form data
    const formData = {
      id: formId || uuidv4(),
      name: formName,
      info: formInfo,
      fields: fields,
      userId: userId || undefined,
      isPublic: isPublic,
      expirationDateTime: expirationDateTime ? new Date(expirationDateTime).toISOString() : undefined,
    };

    console.log("Saving Form Data:", formData);

    // Determine if we're creating or updating a form
    const requestMethod = formId ? "PUT" : "POST"; // Use PUT if formId exists
    const url = formId
      ? `${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`
      : `${import.meta.env.VITE_API_BASE_URL}/api/forms`;

    // Fetch request to save or update form data
    fetch(url, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 403) {
            const errorData = await response.json();
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
        return response.json();
      })
      .then((data) => {
        if (!data) return; // If error was handled above
        // Use setTimeout to delay the dispatch and navigation
        setTimeout(() => {
          // Dispatch the form data returned from the backend (which includes the correct ID)
          dispatch(saveForm(data.updatedForm || formData)); // This should update the existing form

          // Update the loader toast to success
          toast.update(toastId, {
            render: formId
              ? "Form Data updated successfully!"
              : "Form Data saved successfully!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

          // Navigate to the list of saved forms
          navigate("/forms");
        }, 2000); // Adjust the delay as necessary (2000ms = 2 seconds)
      })
      .catch((error) => {
        if (error && error.response && error.response.status === 403) return; // Already handled
        console.error("Error saving form data:", error);
        toast.update(toastId, {
          render: "Failed to save form data.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      });
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

  const handleFieldChange = async (id, value, file = null) => {
    if (file) {
      try {
        const url = await uploadToCloudinary(file);
        dispatch(updateFieldValue({ id, value: url })); // Store URL instead of file
      } catch (error) {
        toast.error("Failed to upload the file");
      }
    } else {
      dispatch(updateFieldValue({ id, value })); // General field value update
      // dispatch(updateQuestionYesNo({ id, value }));
    }

    // Ensure the text editor's value is being dispatched as well
    if (activeFieldId === id) {
      dispatch(updateTextEditorValue({ id, value })); // Update text editor value
    }
    if (activeFieldId === id) {
      dispatch(updateAddressField({ id, value }));
    }

    // Check if the field is a spreadsheet and update accordingly
    if (activeFieldId === id) {
      dispatch(updateSpreadsheet({ id, newValue: value }));
    }
  };

  const activeField = fields.find((field) => field.id === activeFieldId) || {};

  return (
    <div
      className={`flex flex-col h-screen mt-8 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-[#F3F4F6] text-gray-800"
      }`}
    >
      {/* Form Name and Shareable Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`p-6 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } shadow-md rounded-lg`}
      >
        <div className="flex items-center justify-between">
          {/* Form Name Input */}
          <motion.div
            className="relative mb-2 w-full"
            whileHover={{ scale: 1.02, backgroundColor: "#e2ddfe" }} // Reduced hover scale
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="text"
              placeholder="Enter form name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className={`border-0 p-2 rounded-lg w-full transition-colors duration-300 ease-in-out bg-[#e2ddfe] ${
                isDarkMode ? "text-white" : "text-gray-800"
              } font-serif focus:outline-none focus:border-[#7DA0FA]`} // Set background to #e2ddfe
            />
            <motion.div
              className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ease-in-out pointer-events-none ${
                isDarkMode ? "border-gray-600" : "border-transparent"
              }`}
              whileHover={{ borderColor: "#e2ddfe" }}
            ></motion.div>
          </motion.div>
        </div>

        {/* Shareable Link */}
        {/* <motion.div
        className="relative flex items-center mb-4"
        whileHover={{ scale: 1.05, backgroundColor: "#e2ddfe" }} // Reduced hover scale
        whileTap={{ scale: 0.95 }}
      >
        <input
          type="text"
          placeholder="Shareable link"
          value={`http://localhost:3000/form/${formId}`}
          readOnly
          className={`border-0 p-2 rounded-lg w-full transition-colors duration-300 ease-in-out bg-[#e2ddfe] ${
            isDarkMode ? "text-white" : "text-gray-800"
          } font-serif`}
        />
        <motion.div
          className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ease-in-out pointer-events-none ${
            isDarkMode ? "border-gray-600" : "border-transparent"
          }`}
          whileHover={{ borderColor: "#e2ddfe" }}
        ></motion.div>
        <motion.button
          onClick={copyToClipboard}
          className={`ml-2 p-2 border rounded-lg transition-all duration-300 ease-in-out ${
            isDarkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-[#4B49AC] text-white hover:bg-[#3b3f9c]"
          }`}
          whileHover={{ scale: 1.05 }} // Reduced hover scale
          whileTap={{ scale: 0.95 }}
          title="Copy link"
        >
          <FaCopy />
        </motion.button>
      </motion.div> */}

        {/* Form Information */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.03, backgroundColor: "#e2ddfe" }} // Reduced hover scale
          whileTap={{ scale: 0.95 }}
        >
          <textarea
            placeholder="Form information"
            value={formInfo}
            onChange={(e) => setFormInfo(e.target.value)}
            className={`border-0 p-2 rounded-lg w-full transition-colors duration-300 ease-in-out bg-[#e2ddfe] ${
              isDarkMode ? "text-white" : "text-gray-800"
            } font-serif`}
          />
          <motion.div
            className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ease-in-out pointer-events-none ${
              isDarkMode ? "border-gray-600" : "border-transparent"
            }`}
            whileHover={{ borderColor: "#e2ddfe" }}
          ></motion.div>
        </motion.div>
      </motion.div>
      <div className="flex flex-1">
        {/* Left Side: List of Fields */}
        <div
          className={`w-1/2 p-6 border-r ${
            isDarkMode
              ? "border-gray-700 bg-gray-900"
              : "border-[#E5E7EB] bg-white"
          } shadow-md overflow-y-auto`}
        >
          {fields.map((field) => (
            <div
              key={field.id}
              className="mb-6 p-4 bg-[#F9F9F9] rounded-lg border border-[#E5E7EB] shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-[#4B49AC] mb-2">
                    {field.label}
                  </label>

                  {field.type === "optionGroup" || field.type === "Radio-group" ? (
                    !readOnly ? (
                      <div className="flex flex-col space-y-1">
                        {field.options.map(option => (
                          <label key={option.id} className="flex items-center">
                            <input
                              type="radio"
                              name={field.id}
                              value={option.value}
                              checked={values[field.id] === option.value}
                              onChange={e => onChange && onChange(field.id, option.value)}
                              className="form-radio text-[#4B49AC] focus:ring-[#4B49AC]"
                            />
                            <span className="ml-2">{option.value}</span>
                          </label>
                        ))}
                      </div>
                    ) : (
                      <select
                        className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F9F9F9] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                        value={values[field.id]}
                        onChange={e => onChange && onChange(field.id, e.target.value)}
                      >
                        {field.options.map(option => (
                          <option key={option.id} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    )
                  ) : field.type === "dropzone" ? (
                    <UppyDropzone field={field.id} />
                  ) : field.type === "datetime" ? (
                    <DatetimePicker field={field.id} />
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
                      field={field} // Pass the entire field object
                    />
                  ) : field.type === "fileUpload" ? (
                    <input
                      type="file"
                      className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F9F9F9] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                      onChange={(e) =>
                        handleFieldChange(
                          field.id,
                          e.target.value,
                          e.target.files[0]
                        )
                      }
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
                      onChange={(newValue) =>
                        handleFieldChange(field.id, newValue)
                      } // Update Redux on change
                    />
                  ) : field.type === "captcha" ? (
                    <CaptchaEditor
                      key={field.id} // Pass the id for reference
                      id={field.id}
                      value={field.value || ""} // Bind the value from Redux
                      captchaText={field.captchaText} // Pass the generated captcha text
                      onChange={(newValue) =>
                        handleFieldChange(field.id, newValue)
                      } // Update Redux on change
                    />
                  ) : field.type === "spreadsheet" ? (
                    <div className="mb-6">
                      <label className="flex items-center mb-2">
                        <span className="text-gray-700">{field.label}</span>
                      </label>
                      <FormField
                        key={field.id}
                        field={field}
                        handleFieldChange={handleFieldChange}
                        handleDeleteField={handleDeleteField}
                        handleEditField={handleEditField}
                      />
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
                </div>
                <div className="flex-shrink-0 ml-4">
                  {/* Edit Button */}
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      className="bg-[#9b9ef0] text-[#4B49AC] px-4 py-2 rounded-lg flex items-center mb-2 transition-colors duration-300 ease-in-out"
                      onClick={() => handleEditField(field.id)}
                    >
                      {/* Only Icon Visible */}
                      <RiEdit2Line className="mr-2" />
                    </button>
                  </motion.div>

                  {/* Delete Button */}
                  <motion.div
                    className="box"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <button
                      className="bg-[#9b9ef0] text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 ease-in-out"
                      onClick={() => handleDeleteField(field.id)}
                    >
                      {/* Only Icon Visible */}
                      <TiDeleteOutline className="mr-2" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
          <motion.div
            className="box"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <button
              className="bg-[#9b9ef0] text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-300 ease-in-out"
              onClick={handleSave}
            >
              {/* Only Icon Visible */}
              <VscSave className="mr-2 items-center" />
            </button>
          </motion.div>
        </div>
        {/* Right Side: Big Container or Editor */}
        <div
          className={`w-1/2 p-6 ${
            isDarkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-[#E5E7EB]"
          } border-l shadow-md overflow-y-auto`}
        >
          <button
            className="block text-[#4B49AC] mb-4 rounded-lg w-10 h-10 flex items-center justify-center bg-[#E5E7EB] hover:bg-[#D1D5DB] transition-colors duration-300 ease-in-out"
            onClick={handleCloseEditor}
          >
            <FaTimes />
          </button>
          {!showEditor ? (
            <div className="grid grid-cols-3 gap-4">
              <IconButton
                icon={faHeading}
                label="Order Title"
                onMouseEnter={() => handleMouseEnter("orderTitle")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "orderTitle"}
                onClick={() => handleAddField("orderTitle")}
              />
              <IconButton
                icon={faCalendarAlt}
                label="Date"
                onMouseEnter={() => handleMouseEnter("date")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "date"}
                onClick={() => handleAddField("date")}
              />
              <IconButton
                icon={faCircle}
                label="Option Group"
                onMouseEnter={() => handleMouseEnter("optionGroup")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "optionGroup"}
                onClick={() => handleAddField("optionGroup")}
              />
              <IconButton
                icon={faSquareCaretDown}
                label="Dropdown"
                onMouseEnter={() => handleMouseEnter("dropdown")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "dropdown"}
                onClick={() => handleAddField("dropdown")}
              />
              <IconButton
                icon={faFileUpload}
                label="File Upload"
                onMouseEnter={() => handleMouseEnter("fileUpload")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "fileUpload"}
                onClick={() => handleAddField("fileUpload")}
              />
              <IconButton
                icon={faKey}
                label="Secret Text"
                onMouseEnter={() => handleMouseEnter("secretText")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "secretText"}
                onClick={() => handleAddField("secretText")}
              />
              <IconButton
                icon={faSignature}
                label="Signature"
                onMouseEnter={() => handleMouseEnter("signature")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "signature"}
                onClick={() => handleAddField("signature")}
              />
              <IconButton
                icon={faCheckSquare}
                label="Checkbox"
                onMouseEnter={() => handleMouseEnter("checkbox")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "checkbox"}
                onClick={() => handleAddField("checkbox")}
              />
              <IconButton
                icon={faWindowMinimize}
                label="Single Line"
                onMouseEnter={() => handleMouseEnter("Single Line")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "Single Line"}
                onClick={() => handleAddField("orderTitle")}
              />
              <IconButton
                icon={faT}
                label="Formatted Text"
                onMouseEnter={() => handleMouseEnter("Formatted Text")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "Formatted Text"}
                onClick={() => handleAddField("orderTitle")}
              />
              <IconButton
                icon={faBars}
                label="Multiple Lines"
                onMouseEnter={() => handleMouseEnter("Multiple Lines")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "Multiple Lines"}
                onClick={() => handleAddField("orderTitle")}
              />
              <IconButton
                icon={faTable}
                label="Spreadsheet"
                onMouseEnter={() => handleMouseEnter("spreadsheet")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "spreadsheet"}
                onClick={() => handleAddField("spreadsheet")}
              />
              <IconButton
                icon={faRobot}
                label="Captcha"
                onMouseEnter={() => handleMouseEnter("captcha")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "captcha"}
                onClick={() => handleAddField("captcha")}
              />
              <IconButton
                icon={faCode}
                label="Editor"
                onMouseEnter={() => handleMouseEnter("editor")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "editor"}
                onClick={() => handleAddField("texteditor")}
              />
              <IconButton
                icon={null}
                label="Address"
                onMouseEnter={() => handleMouseEnter("address")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "address"}
                onClick={() => handleAddField("address")}
                iconComponent={<MyLocationOutlinedIcon />}
              />
              <IconButton
                icon={null}
                label="Dropzone"
                onMouseEnter={() => handleMouseEnter("dropzone")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "dropzone"}
                onClick={() => handleAddField("dropzone")}
                iconComponent={<FolderOutlinedIcon />}
              />
              <IconButton
                icon={null}
                label="Rating"
                onMouseEnter={() => handleMouseEnter("rating")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "rating"}
                onClick={() => handleAddField("rating")}
                iconComponent={<StarBorderIcon />}
              />
              <IconButton
                icon={null}
                label="DateTime"
                onMouseEnter={() => handleMouseEnter("datetime")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "datetime"}
                onClick={() => handleAddField("datetime")}
                iconComponent={<EventAvailableIcon />}
              />
              <IconButton
                icon={null}
                label="Divider"
                onMouseEnter={() => handleMouseEnter("divider")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "divider"}
                onClick={() => handleAddField("divider")}
                iconComponent={<HorizontalRuleOutlinedIcon />}
              />
              <IconButton
                icon={null}
                label="Email"
                onMouseEnter={() => handleMouseEnter("email")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "email"}
                onClick={() => handleAddField("email")}
                iconComponent={<DraftsOutlinedIcon />}
              />
              <IconButton
                icon={null}
                label="Phone Number"
                onMouseEnter={() => handleMouseEnter("phoneNumber")}
                onMouseLeave={handleMouseLeave}
                isHovered={hoveredField === "phoneNumber"}
                onClick={() => handleAddField("phoneNumber")}
                iconComponent={<PhoneEnabledOutlinedIcon />}
              />
            </div>
          ) : (
            <div>
              {activeField.type === "date" && (
                <DateFieldEditor field={activeField} />
              )}
              {activeField.type === "optionGroup" && (
                <OptionGroupEditor field={activeField} />
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
              {activeField.type === "captcha" && (
                <CaptchaEditor field={activeField} />
              )}
              {activeField.type === "texteditor" && (
                <TextEditor field={activeField} />
              )}
              {activeField.type === "dropzone" && (
                <DropzoneEditor field={activeField} />
              )}
              {activeField.type === "address" && (
                <AddressFieldEditor 
                  field={activeField} 
                  onClose={handleCloseEditor}
                />
              )}
              {activeField.type === "slider" && (
                <SliderFieldEditor field={activeField} onClose={handleCloseEditor} />
              )}
              {/* Handle other field types as needed */}
            </div>
          )}
          <label style={{ display: 'block', margin: '16px 0' }}>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
            />
            {' '}Make this form public (shareable link)
          </label>
          <div style={{ margin: '16px 0' }}>
            <TextField
              label="Expiration Date & Time"
              type="datetime-local"
              value={expirationDateTime}
              onChange={e => setExpirationDateTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <div className="text-xs text-gray-500 mt-1">After this date/time, the form will be inaccessible via the shareable link.</div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default EditForm;
