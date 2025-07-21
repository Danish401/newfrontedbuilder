import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
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
  removeField,
  updateLayout,
  loadForm,
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

import { FaGripVertical } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import DropzoneEditor from "./DropzoneEditor";
import AddressField from "./AddressField";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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

const Preview = () => {
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
  // const [imagePreview, setImagePreview] = useState(null);

  const layout = useSelector((state) => state.form.layout);

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
  useEffect(() => {
    if (formId) {
      // Fetch form data from backend using formId
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/forms/${formId}`)
        .then((response) => {
          dispatch(loadForm(response.data));
          setFormName(response.data.name);
          setFormInfo(response.data.info);
          // Handle image and other data
        })
        .catch((error) => console.error(error));
    } else {
      // Load from localStorage if available
      const savedForm = localStorage.getItem("currentForm");
      if (savedForm) {
        const parsedForm = JSON.parse(savedForm);
        dispatch(loadForm(parsedForm));
        setFormName(parsedForm.name);
        setFormInfo(parsedForm.info);
      }
    }
  }, [formId, dispatch]);
  useEffect(() => {
    const currentForm = { name: formName, info: formInfo, fields, layout };
    localStorage.setItem("currentForm", JSON.stringify(currentForm));
  }, [formName, formInfo, fields, layout]);

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

  const userId = useSelector((state) => state.auth.user?._id || state.auth.user?.id);

  const handleSave = async () => {
    // Check if formName is not empty
    if (formName.trim() === "") {
      toast.error("Please enter a form name.");
      return;
    }

    // Show a loading toast
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
      // Upload the selected file to Cloudinary (if any)
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadToCloudinary(selectedFile);
      }

      // Prepare the form data
      const formData = {
        // id: uuidv4(),
        name: formName,
        info: formInfo,
        fields: fields,
        layout: layout,
        imageUrl: imageUrl || "", // Include the image URL if uploaded
        userId: userId || undefined, // Add userId if logged in
      };

      console.log("Saving Form Data:", formData);

      // Fetch request to save the form data
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/forms`, {
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

      // Use setTimeout to delay the dispatch and navigation
      setTimeout(() => {
        // Dispatch the form data returned from the backend (which includes the correct ID)
        dispatch(saveForm(result.newForm || formData));

        // Update the loader toast to success
        toast.update(toastId, {
          render: "Form Data saved successfully!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });

        // Navigate to the list of saved forms
        // navigate("/forms");
      }, 2000); // Adjust the delay as necessary (2000ms = 2 seconds)
    } catch (error) {
      console.error("Error saving form data:", error);

      // Use setTimeout to show error message after a delay
      setTimeout(() => {
        toast.update(toastId, {
          render: "Failed to save form data.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }, 2000); // Adjust the delay as necessary
    }
  };

  const onLayoutChange = (newLayout) => {
    dispatch(updateLayout(newLayout));
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

  const handlePDFExport = async () => {
    try {
      const responseContentRef = useRef(null);
      const canvas = await html2canvas(responseContentRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('response.pdf');
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF");
    }
  };

  return (
    <div
      className={`flex flex-col h-screen mt-8 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-[#e0e3e9] text-gray-800"
      }`}
    >
      {/* Single Section for Form Fields */}
      <div
        className={`flex flex-col p-6 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        } shadow-md rounded-lg overflow-y-auto`}
      >
        {/* Form Name and Shareable Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`relative z-10 p-6`}
        >
          <div
            className="absolute inset-0 bg-[#E6E7FF] opacity-100"
            style={{
              backgroundColor: "#E6E7FF",
              backgroundImage: `linear-gradient(
                              rgba(0, 11, 255, 0.1), 
                              rgba(0, 11, 255, 0.1)
                          )`,
              zIndex: -1,
            }}
          />

          {/* Form Name Input */}
          <div
            className={`p-6 ${
              isDarkMode ? "bg-gray-900" : "bg-white"
            } shadow-md rounded-lg`}
          >
            <div className="flex items-center justify-between">
              <div className="relative mb-2 w-full">
                <input
                  type="text"
                  placeholder="Enter form name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className={`border-0 p-3 rounded-lg w-full transition-colors duration-300 ease-in-out bg-[#e2ddfe] ${
                    isDarkMode ? "text-white" : "text-gray-800"
                  } font-serif focus:outline-none focus:border-[#7DA0FA]`}
                />
                <motion.div
                  className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ease-in-out pointer-events-none ${
                    isDarkMode ? "border-gray-600" : "border-transparent"
                  }`}
                  whileHover={{ borderColor: "#e2ddfe" }}
                ></motion.div>
              </div>
            </div>

            {/* Form Information */}
            <div className="relative">
              <textarea
                placeholder="Form information"
                value={formInfo}
                onChange={(e) => setFormInfo(e.target.value)}
                className={`border-0 p-3 rounded-lg w-full transition-colors duration-300 ease-in-out bg-[#e2ddfe] ${
                  isDarkMode ? "text-white" : "text-gray-800"
                } font-serif`}
              />
              <motion.div
                className={`absolute inset-0 rounded-lg border-2 transition-all duration-300 ease-in-out pointer-events-none ${
                  isDarkMode ? "border-gray-600" : "border-transparent"
                }`}
                whileHover={{ borderColor: "#e2ddfe" }}
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <div className="template-header">
          <h1>{formName}</h1>
          <h2>{formInfo}</h2>
        </div>

        <GridLayout
          className="layout"
          layout={layout}
          cols={12}
          rowHeight={30}
          width={1200}
          onLayoutChange={onLayoutChange}
          draggableHandle=".field-drag-handle"
        >
          {fields.map((field) => (
            <div
              key={field.id}
              data-grid={layout.find((l) => l.i === field.id)}
            >
              <div
                className={`mb-6 p-4 bg-[#F3F4F6] rounded-lg border border-[#E5E7EB] shadow-sm ${
                  isDarkMode ? "bg-gray-700" : "bg-[#F3F4F6]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center field-drag-handle cursor-move">
                    <span className="mr-2">
                      <FaGripVertical />
                    </span>
                    <label className="block text-sm font-medium text-[#4B49AC] mb-2">
                      {field.label}
                    </label>
                  </div>
                </div>
                {/* Render different field types */}
                {field.type === "optionGroup" || field.type === "dropdown" ? (
                  <select
                    className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                    value={field.value}
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
                  <CustomizedRating key={field.id} field={field} />
                ) : field.type === "fileUpload" ? (
                  <input
                    type="file"
                    className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
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
                    className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
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
                    id={field.id}
                    value={field.value || ""}
                    onChange={(newValue) =>
                      handleFieldChange(field.id, newValue)
                    }
                  />
                ) : field.type === "captcha" ? (
                  <CaptchaEditor
                    key={field.id}
                    id={field.id}
                    value={field.value || ""}
                    captchaText={field.captchaText}
                    onChange={(newValue) =>
                      handleFieldChange(field.id, newValue)
                    }
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
                      checked={!!field.value}
                      onChange={(e) =>
                        handleFieldChange(field.id, e.target.checked)
                      }
                    />
                    <span className="ml-2 text-gray-700">{field.label}</span>
                  </label>
                ) : field.type === "MultipleCheckbox" ? (
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-[#4B49AC] mb-2">{field.label}</label>
                    <div className="flex flex-col space-y-1">
                      {field.options.map(option => {
                        // Support both array and string for value
                        let selectedValues = field.value;
                        if (typeof selectedValues === 'string') {
                          try {
                            selectedValues = JSON.parse(selectedValues);
                          } catch {
                            selectedValues = selectedValues.split(',').map(v => v.trim());
                          }
                        }
                        if (!Array.isArray(selectedValues)) selectedValues = [];
                        const isChecked = selectedValues.includes(option.value);
                        return (
                          <div
                            key={option.id}
                            className={`px-4 py-2 rounded-lg ${isChecked ? 'font-bold text-[#4B49AC]' : ''}`}
                          >
                            - {option.value}
                          </div>
                        );
                      })}
                      <div className="mt-2 text-green-700 font-semibold">
                        Selected: {(() => {
                          let selectedValues = field.value;
                          if (typeof selectedValues === 'string') {
                            try {
                              selectedValues = JSON.parse(selectedValues);
                            } catch {
                              selectedValues = selectedValues.split(',').map(v => v.trim());
                            }
                          }
                          if (!Array.isArray(selectedValues)) selectedValues = [];
                          return selectedValues.length > 0 ? selectedValues.join(', ') : 'None';
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  <input
                    type={field.type === "date" ? "date" : "text"}
                    className="mt-1 block w-full border-[#4B49AC] border-2 rounded-lg bg-[#F3F4F6] text-gray-700 focus:border-[#7DA0FA] transition-colors duration-300 ease-in-out"
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      handleFieldChange(field.id, e.target.value)
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </GridLayout>
      </div>
      <motion.div
        className="mt-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <button
          className="bg-[#9b9ef0] text-white px-6 py-3 rounded-lg flex items-center transition-colors duration-300 ease-in-out hover:bg-[#8c8dd9]"
          onClick={handleSave}
        >
          <span className="text-lg font-bold">Complete</span>
        </button>
      </motion.div>
      <motion.div
        className="mt-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <button
          className="bg-[#9b9ef0] text-white px-6 py-3 rounded-lg flex items-center transition-colors duration-300 ease-in-out hover:bg-[#8c8dd9]"
          onClick={handlePDFExport}
        >
          <span className="text-lg font-bold">Export PDF</span>
        </button>
      </motion.div>
    </div>
  );
};
export default Preview;
