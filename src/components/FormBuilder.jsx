import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { processFormData, validateField, validateForm } from "../lib/utils";
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
  addSelectField,
  addNumberField,
} from "../features/formSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  faBarsProgress,
  faHashtag,
} from "@fortawesome/free-solid-svg-icons";

import { FaCopy, FaGripVertical, FaTimes } from "react-icons/fa";
import { RiEdit2Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import { VscSave } from "react-icons/vsc";
import { BiSelectMultiple } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import all the field components
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
import FormField from "./FormField";
import OptionGroup from "./OptionGroup";
import UppyDropzone from "./UppyDropzone";
import CheckboxFieldEditor from "./CheckboxFieldEditor";
import CaptchaEditor from "./CaptchaEditor";
import SpreadsheetEditor from "./SpreadsheetEditor";
import TextEditor from "./TextEditor";
import DividerText from "./DividerText";
import DividerEditor from "./DividerEditor";
import EmailField from "./EmailField";
import PhoneNumberField from "./PhoneNumberField";
import RatingManager from "./RatingEditor";
import DropzoneEditor from "./DropzoneEditor";
import AddressField from "./AddressField";
import AddressFieldEditor from "./AddressFieldEditor";
import DatetimePicker from "./DatetimePicker";
import CustomizedSlider from "./CustomizedSlider";
import CustomizedRating from "./CustomizedRating";
import RadioGroupEditor from "./RadioGroupEditor";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";
import RatingEditor from "./RatingEditor";
import EmailFieldEditor from "./EmailFieldEditor";
import PhoneNumberFieldEditor from "./PhoneNumberFieldEditor";
import SliderFieldEditor from "./SliderFieldEditor";
import NumberFieldEditor from "./NumberFieldEditor";
import PageBreak from "./PageBreak";

// Material-UI Icons
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import HorizontalRuleOutlinedIcon from "@mui/icons-material/HorizontalRuleOutlined";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Enhanced IconButton Component for Left Sidebar
const SidebarIconButton = ({
  icon,
  label,
  iconComponent,
  isActive,
  onClick,
  isMobile = false,
}) => {
  return (
    <motion.div
      className={`relative flex items-center w-full rounded-xl cursor-pointer transition-all duration-300 mb-2 group ${
        isMobile ? "p-2" : "p-4"
      } ${
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
          : "bg-white hover:bg-blue-50 text-gray-600 hover:text-blue-600 shadow-sm hover:shadow-md"
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02, x: isMobile ? 0 : 5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <div
        className={`flex items-center justify-center rounded-lg transition-all duration-300 ${
          isMobile ? "w-8 h-8 mr-2" : "w-10 h-10 mr-3"
        } ${
          isActive ? "bg-white/20" : "bg-blue-50 group-hover:bg-blue-100"
        }`}
      >
        {icon ? (
          <FontAwesomeIcon
            icon={icon}
            className={`transition-all duration-300 ${
              isMobile ? "text-sm" : "text-lg"
            } ${
              isActive ? "text-white" : "text-blue-600"
            }`}
          />
        ) : (
          <div
            className={`transition-all duration-300 ${
              isMobile ? "text-sm" : "text-lg"
            } ${
              isActive ? "text-white" : "text-blue-600"
            }`}
          >
            {iconComponent}
          </div>
        )}
      </div>
      <span
        className={`font-medium transition-all duration-300 ${
          isMobile ? "text-xs" : "text-sm"
        } ${
          isActive ? "text-white" : "text-gray-700 group-hover:text-blue-700"
        }`}
      >
        {label}
      </span>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          className="absolute w-2 h-2 bg-white rounded-full right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.div>
  );
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
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [formName, setFormName] = useState("Survey");
  const [formInfo, setFormInfo] = useState("Description");
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoveredField, setHoveredField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [headerTitle, setHeaderTitle] = useState("Form Title");
  const [isPublic, setIsPublic] = useState(false);
  const [expirationDateTime, setExpirationDateTime] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFieldType, setActiveFieldType] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const [fieldValues, setFieldValues] = useState(
    fields.reduce((acc, field) => {
      acc[field.id] = field.value || "";
      return acc;
    }, {})
  );

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

    fields.forEach((field) => {
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

  const handleMouseLeave = () => {
    setHoveredField(null);
  };

  const copyToClipboard = () => {
    const link = `${BACKEND_URL}/form/${formId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy link.");
      });
  };

  const uploadToCloudinaryOrRaw = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploaded");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dfbtey2ld/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const userId = useSelector(
    (state) => state.auth.user?._id || state.auth.user?.id
  );

  const handleSave = async () => {
    if (formName.trim() === "") {
      toast.error("Please enter a form name.");
      return;
    }

    const validation = validateAllFields();

    if (!validation.isValid) {
      setShowValidationErrors(true);

      const errorCount = Object.keys(validation.errors).length;
      toast.error(
        `${errorCount} validation error(s) found. Please fix the highlighted fields.`,
        {
          autoClose: 4000,
          closeOnClick: false,
          draggable: false,
        }
      );

      const firstErrorFieldId = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(
        `[data-field-id="${firstErrorFieldId}"]`
      );
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      return;
    }

    clearValidationErrors();

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
      let fileUrl = null;
      if (selectedFile) {
        fileUrl = await uploadToCloudinaryOrRaw(selectedFile);
      }

      const spreadsheetFields = fields.filter(
        (field) => field.type === "spreadsheet"
      );
      console.log("Spreadsheet fields being saved:", spreadsheetFields);

      const formData = {
        id: uuidv4(),
        name: formName,
        info: formInfo,
        fields: processedFields,
        fileUrl: fileUrl || "",
        headerTitle: headerTitle,
        userId: userId || undefined,
        isPublic: isPublic,
        expirationDateTime: expirationDateTime
          ? new Date(expirationDateTime).toISOString()
          : undefined,
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
          toast.error(
            errorData.message ||
              "You can create up to 3 forms for free. Please log in to create more."
          );
          toast.update(toastId, {
            render:
              errorData.message ||
              "You can create up to 3 forms for free. Please log in to create more.",
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
    setActiveFieldType(type);

    // Close mobile sidebar after adding field
    setShowMobileSidebar(false);

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
      case "signature":
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
      case "select":
        const selectPayload = {
          color: "neutral",
          variant: "solid",
          size: "md",
          isDisabled: false,
          placeholder: "Choose one...",
        };
        dispatch(addSelectField(selectPayload));
        break;
      case "number":
        dispatch(addNumberField());
        break;
      case "pageBreak":
        dispatch({
          type: "form/addField",
          payload: { type: "pageBreak", id: uuidv4() },
        });
        break;
      default:
        break;
    }
    setShowEditor(false);
  };

  const handleEditField = (id) => {
    const field = fields.find((f) => f.id === id);
    if (field) {
      setActiveFieldType(field.type);
    }
    dispatch(setActiveField(id));
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    dispatch(setActiveField(null));
    setShowEditor(false);
    setActiveFieldType(null);
  };

  const handleDeleteField = (id) => {
    dispatch(deleteField(id));
  };

  const handleFieldChange = async (fieldId, update, type, file = null) => {
    if (
      typeof update === "object" &&
      update !== null &&
      !Array.isArray(update)
    ) {
      dispatch({
        type: "form/updateField",
        payload: { id: fieldId, ...update },
      });
      return;
    }

    const field = fields.find((f) => f.id === fieldId);
    if (field && (field.type === "email" || field.type === "phoneNumber")) {
      if (
        typeof update === "object" &&
        update !== null &&
        !Array.isArray(update)
      ) {
        dispatch({
          type: "form/updateField",
          payload: { id: fieldId, ...update },
        });
      } else {
        dispatch(updateFieldValue({ id: fieldId, value: update }));
      }
      return;
    }

    if (validationErrors[fieldId]) {
      setValidationErrors((prev) => {
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

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newFields = reorderFields(
      fields,
      result.source.index,
      result.destination.index
    );
    dispatch({ type: "form/setFields", payload: newFields });
  };

  const fieldTypes = [
    { icon: faHeading, label: "Text Input", type: "orderTitle" },
    { icon: faCalendarAlt, label: "Date", type: "date" },
    { icon: faCircle, label: "Multiple Choice", type: "optionGroup" },
    { icon: faSquareCaretDown, label: "Dropdown", type: "dropdown" },
    { icon: faFileUpload, label: "File Upload", type: "fileUpload" },
    { icon: faKey, label: "Textarea", type: "secretText" },
    { icon: faSignature, label: "Signature", type: "signature" },
    { icon: faCheckSquare, label: "Checkbox", type: "checkbox" },
    { icon: faTable, label: "Table", type: "spreadsheet" },
    { icon: faCode, label: "Rich Text", type: "texteditor" },
    {
      iconComponent: <MyLocationOutlinedIcon />,
      label: "Address",
      type: "address",
    },
    { iconComponent: <StarBorderIcon />, label: "Rating", type: "rating" },
    {
      iconComponent: <EventAvailableIcon />,
      label: "Date & Time",
      type: "datetime",
    },
    {
      iconComponent: <HorizontalRuleOutlinedIcon />,
      label: "Divider",
      type: "divider",
    },
    { iconComponent: <DraftsOutlinedIcon />, label: "Email", type: "email" },
    {
      iconComponent: <PhoneEnabledOutlinedIcon />,
      label: "Phone",
      type: "phoneNumber",
    },
    {
      iconComponent: <RadioButtonCheckedIcon />,
      label: "Radio Group",
      type: "Radio-group",
    },
    {
      iconComponent: <BiSelectMultiple />,
      label: "Multi Select",
      type: "MultipleCheckbox",
    },
    {
      iconComponent: <FontAwesomeIcon icon={faBarsProgress} />,
      label: "Slider",
      type: "slider",
    },
    {
      iconComponent: <FontAwesomeIcon icon={faHashtag} />,
      label: "Number",
      type: "number",
    },
    {
      iconComponent: (
        <hr style={{ width: "20px", borderTop: "2px dashed #6366f1" }} />
      ),
      label: "Page Break",
      type: "pageBreak",
    },
  ];

  // Function to render field content without label for specific field types
  const renderFieldInput = (field) => {
    switch (field.type) {
      case "optionGroup":
      case "dropdown":
        return (
          <select
            className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
            value={fieldValues[field.id]}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          >
            {field.options?.map((option) => (
              <option key={option.id} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        );

      case "Radio-group":
        return (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            {field.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer text-sm md:text-base"
              >
                <input
                  type="radio"
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  value={option.value}
                  checked={fieldValues[field.id] === option.value}
                  onChange={() =>
                    handleFieldChange(field.id, option.value, field.type)
                  }
                />
                <span className="text-gray-700">{option.value}</span>
              </label>
            ))}
          </div>
        );

      case "MultipleCheckbox":
        return (
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
            {field.options?.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-2 cursor-pointer text-sm md:text-base"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  value={option.value}
                  checked={
                    fieldValues[field.id]?.includes(option.value) || false
                  }
                  onChange={() =>
                    handleFieldChange(field.id, option.value, field.type)
                  }
                />
                <span className="text-gray-700">{option.value}</span>
              </label>
            ))}
          </div>
        );

      case "select":
        return <CustomSelect field={field} />;

      case "datetime":
        return <DatetimePicker key={field.id} field={field} />;

      case "phoneNumber":
        return (
          <PhoneNumberField
            key={field.id}
            field={field}
            handleFieldChange={handleFieldChange}
          />
        );

      case "email":
        return (
          <EmailField
            key={field.id}
            field={field}
            handleFieldChange={handleFieldChange}
          />
        );

      case "slider":
        return <CustomizedSlider field={field} hideLabel={false} />;

      case "divider":
        return <DividerText key={field.id} field={field} />;

      case "rating":
        return <CustomizedRating key={field.id} field={field} />;

      case "fileUpload":
        return (
          <input
            type="file"
            className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
            onChange={(e) =>
              handleFieldChange(field.id, null, field.type, e.target.files[0])
            }
          />
        );

      case "secretText":
        return (
          <textarea
            rows="3"
            className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg resize-none focus:border-blue-500 focus:outline-none text-sm md:text-base"
            value={field.value}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );

      case "address":
        return <AddressField id={field.id} />;

      case "signature":
        return (
          <SignaturePad
            field={field}
            onSave={(signature) => handleFieldChange(field.id, signature)}
          />
        );

      case "texteditor":
        return (
          <TextEditor
            id={field.id}
            value={field.value || ""}
            label={field.label}
          />
        );

      case "spreadsheet":
        return (
          <FormField
            key={field.id}
            field={field}
            handleFieldChange={handleFieldChange}
            handleDeleteField={handleDeleteField}
            handleEditField={handleEditField}
          />
        );

      case "orderTitle":
      case "text":
        return (
          <div>
            <input
              type="text"
              className={`w-full px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg bg-white text-gray-700 focus:outline-none transition-all duration-300 text-sm md:text-base ${
                showValidationErrors && validationErrors[field.id]
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-200 focus:border-blue-500"
              }`}
              value={field.value || ""}
              placeholder={field.placeholder || ""}
              maxLength={field.maxLength || undefined}
              required={field.required || false}
              style={{
                fontWeight: field.isBold ? "bold" : "normal",
                fontStyle: field.isItalic ? "italic" : "normal",
                color: field.textColor || "#374151",
              }}
              onChange={(e) => {
                let value = e.target.value;
                if (field.maxLength && value.length > field.maxLength) {
                  value = value.slice(0, field.maxLength);
                }
                handleFieldChange(field.id, value);
              }}
            />
            {field.maxLength && (
              <div
                className={`text-xs md:text-sm mt-2 ${
                  field.value && field.value.length > field.maxLength
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {field.value ? field.value.length : 0} / {field.maxLength}{" "}
                characters
                {field.value && field.value.length > field.maxLength && (
                  <span className="ml-2">⚠️ Character limit exceeded</span>
                )}
              </div>
            )}
          </div>
        );

      case "checkbox":
        return (
          <label className="flex items-center space-x-2 md:space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={field.checked}
              onChange={(e) => handleFieldChange(field.id, e.target.checked)}
            />
            <span className="text-gray-700 text-sm md:text-base">
              {field.checkboxLabel || field.label}
            </span>
          </label>
        );

      case "number":
        return (
          <div>
            <input
              type="number"
              className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              value={fieldValues[field.id]}
              required={field.required}
              placeholder={field.placeholder}
              step={field.decimal ? "any" : "1"}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
            />
            {field.required && !fieldValues[field.id] && (
              <div className="mt-2 text-xs md:text-sm text-red-500">
                This field is required
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type={field.type === "date" ? "date" : "text"}
            className="w-full px-3 py-2 md:px-4 md:py-3 text-gray-700 transition-all duration-300 bg-white border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
            value={field.value}
            placeholder={field.placeholder}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 fixed top-0 left-0 right-0 z-50 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faBars} className="text-blue-600" />
          </button>
          <h1 className="text-lg font-bold text-gray-800 truncate mx-4">
            Form Builder
          </h1>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md"
            onClick={handleSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <VscSave className="text-sm" />
            Save
          </motion.button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {showMobileSidebar && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
            />
            <motion.div
              className="fixed left-0 top-0 bottom-0 bg-white shadow-xl z-50 w-80 max-w-[90vw] lg:hidden overflow-hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex flex-col h-full">
                {/* Mobile Sidebar Header */}
                <div className="p-4 bg-[#3c9087] border-b-4 border-[#4b49ac] flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-bold text-[#eff6ff]">
                      ✨ Form Elements
                    </h2>
                    <button
                      onClick={() => setShowMobileSidebar(false)}
                      className="flex items-center justify-center w-8 h-8 text-white bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <FaTimes className="text-sm" />
                    </button>
                  </div>
                  <p className="text-[#d1f0e8] text-sm leading-relaxed">
                    Tap to add form elements
                  </p>
                </div>

                {/* Mobile Field Types */}
                <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                  {fieldTypes.map((item, idx) => (
                    <SidebarIconButton
                      key={item.label}
                      icon={item.icon}
                      iconComponent={item.iconComponent}
                      label={item.label}
                      isActive={activeFieldType === item.type}
                      onClick={() => handleAddField(item.type)}
                      isMobile={true}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Layout Container */}
      <div className="flex h-screen pt-16 lg:pt-0">
        {/* Desktop Left Sidebar - Field Types */}
        <div className="hidden lg:flex flex-col bg-white border-r border-gray-200 shadow-xl w-80 xl:w-96">
          {/* Sidebar Header */}
          <div className="p-6 xl:p-8 bg-[#3c9087] border-b-4 border-[#4b49ac] shadow-lg flex-shrink-0">
            <h2 className="text-2xl xl:text-3xl font-extrabold text-[#eff6ff] mb-2 tracking-wider drop-shadow-sm">
              ✨ Form Elements
            </h2>
            <p className="text-[#d1f0e8] text-sm xl:text-base font-medium leading-relaxed">
              Drag <span className="text-[#fdfd96] font-semibold">and</span>{" "}
              drop to{" "}
              <span className="text-[#ffd1dc] font-semibold">build</span> your
              custom form with ease.
            </p>
          </div>

          {/* Field Types */}
          <div className="flex-1 p-4 space-y-1 overflow-y-auto">
            {fieldTypes.map((item, idx) => (
              <SidebarIconButton
                key={item.label}
                icon={item.icon}
                iconComponent={item.iconComponent}
                label={item.label}
                isActive={activeFieldType === item.type}
                onClick={() => handleAddField(item.type)}
              />
            ))}
          </div>
        </div>

        {/* Middle - Form Preview */}
        <div className="flex flex-col flex-1 bg-gray-50 min-w-0 overflow-hidden">
          {/* Form Header */}
          <div className="p-4 lg:p-6 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <input
                className="w-full mb-3 text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 placeholder-gray-400 bg-transparent border-none focus:outline-none"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter Form Name"
              />
              <textarea
                className="w-full text-center text-gray-600 placeholder-gray-400 bg-transparent border-none resize-none focus:outline-none text-sm md:text-base"
                value={formInfo}
                onChange={(e) => setFormInfo(e.target.value)}
                placeholder="Add form description..."
                rows="2"
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {/* Form Fields */}
              <div className="space-y-4 md:space-y-6">
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="form-fields-droppable">
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 md:space-y-4 ${
                          snapshot.isDraggingOver
                            ? "bg-blue-50 rounded-lg p-4"
                            : ""
                        }`}
                      >
                        <AnimatePresence>
                          {pages[currentPage].map((field, idx) =>
                            field.type === "pageBreak" ? (
                              <PageBreak key={field.id} />
                            ) : (
                              <Draggable
                                draggableId={field.id}
                                index={idx}
                                key={field.id}
                              >
                                {(provided, snapshot) => (
                                  <motion.div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={`group bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 transition-all duration-300 hover:shadow-md ${
                                      snapshot.isDragging
                                        ? "shadow-xl rotate-2"
                                        : ""
                                    } ${
                                      showValidationErrors &&
                                      validationErrors[field.id]
                                        ? "border-red-300 bg-red-50"
                                        : ""
                                    }`}
                                    style={{ ...provided.draggableProps.style }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    data-field-id={field.id}
                                  >
                                    <div className="flex items-start gap-2 md:gap-4">
                                      {/* Drag Handle - Desktop Only */}
                                      <div
                                        {...provided.dragHandleProps}
                                        className="hidden md:flex flex-shrink-0 p-2 transition-colors duration-200 rounded-lg opacity-0 cursor-move bg-gray-50 hover:bg-blue-50 group-hover:opacity-100"
                                      >
                                        <FaGripVertical className="text-gray-400 hover:text-blue-500" />
                                      </div>

                                      {/* Field Content */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-3 md:mb-4">
                                          {/* Field Label */}
                                          {field.type !== "checkbox" &&
                                            field.type !== "divider" &&
                                            field.type !== "slider" &&
                                            field.type !== "rating" && (
                                              <label
                                                className="text-base md:text-lg font-semibold text-gray-800 pr-2 flex-1 min-w-0"
                                                style={{
                                                  fontWeight: field.isBold
                                                    ? "bold"
                                                    : "normal",
                                                  fontStyle: field.isItalic
                                                    ? "italic"
                                                    : "normal",
                                                  color:
                                                    field.textColor ||
                                                    "#1f2937",
                                                }}
                                              >
                                                <span className="block truncate">
                                                  {field.label}
                                                  {field.required && (
                                                    <span className="ml-1 text-red-500">
                                                      *
                                                    </span>
                                                  )}
                                                </span>
                                              </label>
                                            )}

                                          {/* Action Buttons */}
                                          <div className="flex gap-2 md:gap-3 transition-opacity duration-200 opacity-100 md:opacity-0 md:group-hover:opacity-100 flex-shrink-0 ml-2">
                                            {/* Properties (Edit) Button */}
                                            <motion.button
                                              whileHover={{ scale: 1.08 }}
                                              whileTap={{ scale: 0.95 }}
                                              className="flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 bg-gradient-to-r from-indigo-400 to-blue-500 text-white rounded-full shadow-md transition-all duration-300"
                                              onClick={() =>
                                                handleEditField(field.id)
                                              }
                                              aria-label="Edit field"
                                            >
                                              <MdOutlineSettingsSuggest className="text-sm md:text-lg" />
                                              <span className="hidden md:inline ml-1 text-sm">
                                                Properties
                                              </span>
                                            </motion.button>

                                            {/* Delete Button */}
                                            <motion.button
                                              whileHover={{ scale: 1.08 }}
                                              whileTap={{ scale: 0.95 }}
                                              className="flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-3 md:py-1.5 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full shadow-md transition-all duration-300"
                                              onClick={() =>
                                                handleDeleteField(field.id)
                                              }
                                              aria-label="Delete field"
                                            >
                                              <RiDeleteBin5Fill className="text-sm md:text-lg" />
                                              <span className="hidden md:inline ml-1 text-sm">
                                                Delete
                                              </span>
                                            </motion.button>
                                          </div>
                                        </div>

                                        {/* Field Input Rendering */}
                                        <div className="space-y-3">
                                          {renderFieldInput(field)}
                                        </div>

                                        {/* Validation Error Display */}
                                        {showValidationErrors &&
                                          validationErrors[field.id] && (
                                            <div className="flex items-center p-3 mt-3 text-xs md:text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
                                              <span className="mr-2">⚠️</span>
                                              {validationErrors[field.id]}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </Draggable>
                            )
                          )}
                        </AnimatePresence>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>

                {/* Empty State */}
                {fields.length === 0 && (
                  <div className="py-12 md:py-16 text-center">
                    <div className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 rounded-full">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="text-xl md:text-2xl text-gray-400"
                      />
                    </div>
                    <h3 className="mb-2 text-lg md:text-xl font-semibold text-gray-600">
                      No fields added yet
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base px-4">
                      {isMobile 
                        ? "Tap the menu button to add form elements"
                        : "Select elements from the left panel to start building your form"
                      }
                    </p>
                  </div>
                )}
              </div>

              {/* Page Navigation */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between p-3 md:p-4 mt-6 md:mt-8 bg-white border border-gray-200 shadow-sm rounded-xl">
                  <button
                    className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                    disabled={currentPage === 0}
                  >
                    ← <span className="hidden sm:inline">Previous</span><span className="sm:hidden">Prev</span>
                  </button>
                  <span className="font-medium text-gray-700 text-sm md:text-base px-2">
                    Page {currentPage + 1} of {totalPages}
                  </span>
                  <button
                    className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold text-white transition-all duration-300 bg-blue-500 rounded-lg shadow-sm hover:bg-blue-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={currentPage === totalPages - 1}
                  >
                    <span className="hidden sm:inline">Next</span><span className="sm:hidden">Next</span> →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Bar - Desktop Only */}
          <div className="hidden lg:block p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="text-sm text-gray-500">
                {fields.length} field{fields.length !== 1 ? "s" : ""} added
              </div>
              <motion.button
                className="flex items-center gap-3 px-6 xl:px-8 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleSave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <VscSave className="text-lg" />
                Save Form
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Field Editor */}
        {showEditor && (
          <motion.div
            className={`${
              isMobile
                ? "fixed inset-0 z-50 bg-white flex flex-col"
                : "flex flex-col bg-white border-l border-gray-200 shadow-xl w-80 xl:w-96"
            }`}
            initial={{ 
              x: isMobile ? "100%" : 300, 
              opacity: 0 
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ 
              x: isMobile ? "100%" : 300, 
              opacity: 0 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Editor Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-pink-600 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="mb-1 text-lg xl:text-xl font-semibold text-white truncate">
                    Field Settings
                  </h3>
                  <p className="text-sm text-purple-100">
                    Configure your field properties
                  </p>
                </div>
                <button
                  className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 text-white transition-all duration-300 rounded-full hover:scale-110 bg-white/20 hover:bg-white/30 flex-shrink-0"
                  onClick={handleCloseEditor}
                >
                  <FaTimes className="text-sm lg:text-base" />
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
              <div className="space-y-4 lg:space-y-6">
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
                )}
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
            </div>

            {/* Mobile Editor Footer */}
            {isMobile && (
              <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                <button
                  onClick={handleCloseEditor}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold transition-all duration-300 hover:from-purple-700 hover:to-pink-700 active:scale-95"
                >
                  Done Editing
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Toast Container with responsive positioning */}
      <ToastContainer
        position={isMobile ? "top-center" : "bottom-right"}
        className="z-50"
        toastClassName="bg-white shadow-lg border border-gray-200"
        style={{
          fontSize: isMobile ? "14px" : "16px",
          marginTop: isMobile ? "70px" : "0px",
        }}
      />
    </div>
  );
};

export default FormBuilder;
