import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { sizeMapping } from "./sizeMapping";
const initialState = {
  fields: [],
  activeFieldId: null,
  savedForms: [], // List of saved forms
  isDarkMode: false, // Add dark mode state
  fieldValues: {},
  selectedOptions: [],
  layout: [], // Array to store layout information
};
const generateRandomChar = (min, max) =>
  String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

const generateCaptchaText = () => {
  let captcha = "";
  for (let i = 0; i < 3; i++) {
    captcha += generateRandomChar(65, 90);
    captcha += generateRandomChar(97, 122);
    captcha += generateRandomChar(48, 57);
  }
  return captcha
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // addField: (state, action) => {
    //   const { type, label, ...rest } = action.payload;
    //   const id = uuidv4();

    //   // Define default width and height based on field type
    //   let defaultWidth = 2;
    //   let defaultHeight = 1;
    //   if (type === "textarea" || type === "texteditor") {
    //     defaultHeight = 2;
    //   } else if (type === "dropdown" || type === "radio" || type === "checkbox") {
    //     defaultWidth = 3;
    //   }

    //   // Calculate the maximum y value in the current layout
    //   const maxY = state.layout.reduce((max, item) => Math.max(max, item.y + item.h), 0);

    //   // Set the new field's y position below the last row with a vertical gap
    //   const y = maxY + 1; // '+1' adds a vertical gap equivalent to the rowHeight

    //   // Push the new field to the fields array
    //   state.fields.push({ id, type, label, ...rest });

    //   // Add default layout for the new field
    //   state.layout.push({
    //     i: id,
    //     x: 0, // Start at the first column to maintain vertical stacking
    //     y: y,
    //     w: defaultWidth,
    //     h: defaultHeight,
    //     static: false,
    //   });
    // },

    addField: (state, action) => {
      const { type, label, ...rest } = action.payload;
      const id = uuidv4();

      // Get default size from the mapping; fallback to {w: 3, h: 1} if not defined
      const { w: defaultWidth = 3, h: defaultHeight = 8 } =
        sizeMapping[type] || {};

      // Calculate the maximum y value in the current layout to position the new field below
      const maxY = state.layout.reduce(
        (max, item) => Math.max(max, item.y + item.h),
        0
      );

      // Set the new field's y position below the last row with a vertical gap
      const y = maxY + 1; // '+1' adds a vertical gap equivalent to the rowHeight

      // Position x at 0 to stack vertically; adjust if needed
      const x = 0;

      // Push the new field to the fields array
      state.fields.push({ id, type, label, ...rest });

      // Add default layout for the new field
      state.layout.push({
        i: id,
        x: x,
        y: y,
        w: defaultWidth,
        h: defaultHeight,
        static: false,
      });
    },
    removeField: (state, action) => {
      const fieldId = action.payload;
      state.fields = state.fields.filter((field) => field.id !== fieldId);
      state.layout = state.layout.filter(
        (layoutItem) => layoutItem.i !== fieldId
      );
    },

    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode; // Toggle dark mode state
    },
    addQuestion: (state, action) => {
      const newQuestionField = {
        id: uuidv4(),
        type: "question",
        questionText: action.payload.questionText || "Default Question?",
        answer: null, // Initial answer, can be "Yes" or "No"
      };
      state.fields.push(newQuestionField);
    },

    addSelectField: (state, action) => {
      const newSelectField = {
        id: uuidv4(),
        type: "select",
        color: action.payload.color || "neutral",
        variant: action.payload.variant || "solid",
        size: action.payload.size || "md",
        isDisabled: action.payload.isDisabled || false,
        placeholder: action.payload.placeholder || "Choose one...",
        options: action.payload.options || [], // Add options to state
        value: "", // Initial value
      };
      state.fields.push(newSelectField);
    },
    updateSelectField: (state, action) => {
      const { id, value } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.value = value; // Update the value
      }
    },
    addQuestionYesNo: (state) => {
      const newQuestionField = {
        id: uuidv4(),
        type: "questionYesNo",
        question: "",
        answer: "",
      };
      state.fields.push(newQuestionField);
    },
    updateQuestionYesNo: (state, action) => {
      const { id, question, answer } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field && field.type === "questionYesNo") {
        field.question = question;
        field.answer = answer;
      }
    },
    addDivider: (state) => {
      const newDividerField = {
        id: uuidv4(),
        type: "divider",
        label: "Divider",
        color: "#000000",
        thickness: 1,
        width: "100%",
        height: "1px",
        style: "solid", // solid, dashed, dotted
        margin: "10px 0",
      };
      state.fields.push(newDividerField);
    },
    updateDivider: (state, action) => {
      const { id, ...updates } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field && field.type === "divider") {
        Object.assign(field, updates); // Update all provided properties
      }
    },
    setDivider: (state, action) => {
      state.activeFieldId = action.payload;
    },
    addSliderField: (state) => {
      const newSliderField = {
        id: uuidv4(),
        type: "slider",
        value: 20, // Default value for the PrettoSlider
      };
      state.fields.push(newSliderField);
    },
    addDatetimeField: (state, action) => {
      const newDatetimeField = {
        id: uuidv4(),
        type: "datetime",
        label: "Date && Time",
        value: action.payload || null, // Default value
      };
      state.fields.push(newDatetimeField);
    },
    updateDateTimeField: (state, action) => {
      const { id, value, label } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field && field.type === "datetime") {
        field.value = value !== undefined ? value : field.value; // Update the value if provided
        if (label !== undefined) {
          field.label = label; // Update the label if provided
        }
      }
    },
    addRating: (state, action) => {
      const newRatingField = {
        id: uuidv4(),
        type: "rating",
        label: action.payload.label || "Feedback", // Default to 'Feedback'
        value: action.payload.value || 0, // Default value to 0
        ratingType: action.payload.ratingType || "star", // Default to 'star'
      };
      state.fields.push(newRatingField);
    },
    updateRating: (state, action) => {
      const { id, value, label, ratingIcon, ratingAmount } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field && field.type === "rating") {
        field.value = value !== undefined ? value : field.value; // Update rating value if provided
        if (label !== undefined) {
          field.label = label; // Update label if provided
        }
        if (ratingIcon !== undefined) {
          field.ratingIcon = ratingIcon;
        }
        if (ratingAmount !== undefined) {
          field.ratingAmount = ratingAmount;
        }
      }
    },
    deleteRating: (state, action) => {
      state.fields = state.fields.filter(
        (field) => field.id !== action.payload.id
      );
    },
    // Updated reducer for ratings

    addDropzoneField: (state) => {
      const newDropzoneField = {
        id: uuidv4(),
        label: "Dropzone",
        type: "dropzone",
        fileType:
          "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        maxFileSize: 5 * 1024 * 1024, // 5 MB
        files: [],
      };
      state.fields.push(newDropzoneField);
    },

    updateDropzoneFileType: (state, action) => {
      const { fieldId, fileType } = action.payload;
      const field = state.fields.find((field) => field.id === fieldId);
      if (field) {
        field.fileType = fileType;
      }
    },
    updateDropzoneMaxFileSize: (state, action) => {
      const { fieldId, maxFileSize } = action.payload;
      const field = state.fields.find((field) => field.id === fieldId);
      if (field) {
        field.maxFileSize = maxFileSize;
      }
    },
    setDropzoneFiles: (state, action) => {
      const { fieldId, files } = action.payload;
      const field = state.fields.find((field) => field.id === fieldId);
      if (field && field.type === "dropzone") {
        field.files = files; // Update the files array with URLs
      }
    },

    updateDropzoneLabel: (state, action) => {
      const { fieldId, label } = action.payload;
      const field = state.fields.find((field) => field.id === fieldId);
      if (field) {
        field.label = label;
      }
    },

    addAddressField: (state) => {
      const newAddressField = {
        id: uuidv4(), // Unique identifier for the field
        type: "address",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postCode: "",
        country: "",
      };
      state.fields.push(newAddressField); // Add the new address field to the state
    },

    updateAddressField: (state, action) => {
      const { id, name, value } = action.payload;
      const field = state.fields.find((field) => field.id === id); // Find the field by ID

      if (field && field.type === "address") {
        field[name] = value; // Update the specific part of the address (e.g., addressLine1, city, etc.)
      }
    },

    updateFieldLabel: (state, action) => {
      const { id, label } = action.payload;
      const field = state.fields.find((field) => field.id === id); // Find the field by ID

      if (field) {
        field.label = label; // Update the field's label
      }
    },

    addCaptchaField: (state) => {
      const newCaptchaField = {
        id: uuidv4(),
        label: "Captcha",
        type: "captcha",
        placeholder: "Enter the captcha text",
        value: "",
        required: true,
        helpText: "Please solve the captcha",
        captchaText: generateCaptchaText(), // Store the generated captcha text
      };
      state.fields.push(newCaptchaField);
    },
    refreshCaptchaText: (state, action) => {
      const { fieldId } = action.payload;
      const field = state.fields.find((field) => field.id === fieldId);
      if (field && field.type === "captcha") {
        field.captchaText = generateCaptchaText();
        field.value = ""; // Clear user input when captcha is refreshed
      }
    },

    addTextEditor: (state) => {
      const newField = {
        id: uuidv4(),
        type: "texteditor",
        value: "", // Initial value for the text editor
        label: "Text Editor In React JS", // Default label
      };
      state.fields.push(newField);
    },
    updateTextEditorValue: (state, action) => {
      const { id, newValue } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);
      if (fieldIndex !== -1) {
        state.fields[fieldIndex].value = newValue;
      }
    },
    updateTextEditorLabel: (state, action) => {
      const { id, newLabel } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);
      if (fieldIndex !== -1) {
        state.fields[fieldIndex].label = newLabel;
      }
    },

    addSpreadsheet: (state) => {
      const size = 3; // Set to 3 for a 3x3 square matrix
      const newSpreadsheet = {
        id: uuidv4(),
        type: "spreadsheet",
        label: "New Spreadsheet",
        columns: Array(size)
          .fill(null)
          .map((_, index) => ({ id: uuidv4(), name: `Column ${index + 1}` })), // Dynamically set column names
        rows: Array(size)
          .fill(null)
          .map(() => ({
            id: uuidv4(),
            name: "", // Row names if needed
            data: Array(size).fill(""), // Fill with empty strings for 3 columns
          })),
      };
      state.fields.push(newSpreadsheet);
    },

    deleteColumn: (state, action) => {
      const { spreadsheetId, columnIndex } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === spreadsheetId);
      if (spreadsheet) {
        spreadsheet.columns.splice(columnIndex, 1);
        spreadsheet.rows.forEach((row) => row.data.splice(columnIndex, 1));
      }
    },
    deleteRow: (state, action) => {
      const { spreadsheetId, rowIndex } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === spreadsheetId);
      if (spreadsheet) {
        spreadsheet.rows.splice(rowIndex, 1);
      }
    },
    updateColumnName: (state, action) => {
      const { spreadsheetId, index, newName } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === spreadsheetId);
      if (spreadsheet && spreadsheet.columns[index]) {
        spreadsheet.columns[index].name = newName;
      }
    },

    updateCellValue: (state, action) => {
      const { spreadsheetId, rowIndex, columnIndex, newValue } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === spreadsheetId);
      if (spreadsheet && spreadsheet.rows[rowIndex]) {
        spreadsheet.rows[rowIndex].data[columnIndex] = newValue;
      }
    },
    addColumn: (state, action) => {
      const { spreadsheetId } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === spreadsheetId);
      if (spreadsheet) {
        const newColumn = { id: uuidv4(), name: "" };
        spreadsheet.columns.push(newColumn);
        spreadsheet.rows.forEach((row) => row.data.push("")); // Add an empty cell for each row
      }
    },
    addRow: (state, action) => {
      const { spreadsheetId } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === spreadsheetId);
      if (spreadsheet) {
        const newRow = {
          id: uuidv4(),
          data: Array(spreadsheet.columns.length).fill(""),
        };
        spreadsheet.rows.push(newRow);
      }
    },
    updateSpreadsheet: (state, action) => {
      const { id, updatedSpreadsheet } = action.payload;
      const index = state.fields.findIndex((fld) => fld.id === id);
      if (index !== -1) {
        state.fields[index] = updatedSpreadsheet;
      }
    },
    updateSpreadsheetName: (state, action) => {
      const { id, newName } = action.payload;
      const spreadsheet = state.fields.find((fld) => fld.id === id);
      if (spreadsheet) {
        spreadsheet.label = newName;
      }
    },
    addEmailField: (state) => {
      const newField = {
        id: uuidv4(),
        label: "Email",
        type: "email",
        value: "",
        required: true,
        placeholder: "Enter email",
      };
      state.fields.push(newField);
    },
    // addField: (state) => {
    //   const newField = {
    //     id: uuidv4(),
    //     label: "New Field",
    //     type: "text",
    //     placeholder: "",
    //     value: "",
    //     required: false,
    //   };
    //   state.fields.push(newField);
    // },
    addOrderTitle: (state) => {
      const newField = {
        id: uuidv4(),
        label: "New Order Title",
        type: "orderTitle",
        placeholder: "",
        value: "",
        required: false,
      };
      state.fields.push(newField);
    },
    addSingleChoiceField: (state) => {
      const newField = {
        id: uuidv4(),
        label: "New Single Choice Field",
        type: "singleChoice",
        options: [
          { id: uuidv4(), value: "Option 1" },
          { id: uuidv4(), value: "Option 2" },
        ],
        value: "",
        required: false,
        helpText: "",
      };
      state.fields.push(newField);
    },
    updateSingleChoiceOptions: (state, action) => {
      const { id, options } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.options = options;
      }
    },
    updateSingleChoiceValue: (state, action) => {
      const { id, value } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.value = value;
      }
    },
    addSecretTextField: (state) => {
      const newField = {
        id: uuidv4(),
        label: "Hidden Field",
        type: "secretText",
        placeholder: "",
        value: "",
        required: false,
      };
      state.fields.push(newField);
    },
    addDateField: (state) => {
      const newField = {
        id: uuidv4(),
        label: "New Date Field",
        type: "date",
        value: "",
        required: false,
        helpText: "",
      };
      state.fields.push(newField);
    },
    addOptionGroup: (state) => {
      const newOptionGroup = {
        id: uuidv4(),
        label: "Option Group",
        type: "optionGroup",
        options: [
          { id: uuidv4(), value: "Option 1" },
          { id: uuidv4(), value: "Option 2" },
          { id: uuidv4(), value: "Option 3" },
        ],
        required: false,
        helpText: "",
      };
      state.fields.push(newOptionGroup);
    },
    addDropdownField: (state) => {
      const newDropdownField = {
        id: uuidv4(),
        label: "Dropdown",
        type: "dropdown",
        options: [
          { id: uuidv4(), value: "Select an option" },
          { id: uuidv4(), value: "Option 1" },
          { id: uuidv4(), value: "Option 2" },
          { id: uuidv4(), value: "Option 3" },
        ],
        required: false,
        helpText: "",
      };
      state.fields.push(newDropdownField);
    },
    addSignatureField: (state) => {
      const newSignatureField = {
        id: uuidv4(),
        label: "Signature",
        type: "signature",
        value: null,
        required: false,
        helpText: "",
      };
      state.fields.push(newSignatureField);
    },

    addFileUploadField: (state) => {
      const newFileUploadField = {
        id: uuidv4(),
        label: "File Upload",
        type: "fileUpload", // Ensure this matches what you're checking later
        value: null,
        required: false,
        helpText: "",
      };
      state.fields.push(newFileUploadField);
    },

    // addSecretTextField: (state) => {
    //   const newSecretTextField = {
    //     id: uuidv4(),
    //     label: "Secret Text",
    //     type: "secretText",
    //     placeholder: "Enter secret text here...",
    //     value: "",
    //     required: false,
    //     helpText: "",
    //   };
    //   state.fields.push(newSecretTextField);
    // },
    setActiveField: (state, action) => {
      state.activeFieldId = action.payload;
    },
    addCheckbox: (state) => {
      const newCheckbox = {
        id: uuidv4(),
        label: "Checkbox Label", // Default label
        type: "checkbox",
        checked: false, // Default unchecked state
        required: false,
        helpText: "",
      };
      state.fields.push(newCheckbox);
    },

    // updateFieldValue: (state, action) => {
    //   const { id, value } = action.payload;
    //   const field = state.fields.find((field) => field.id === id);
    //   if (field) {
    //     field.value = value;
    //   }
    // },

    updateCheckbox: (state, action) => {
      const { id, label, required, helpText, checked } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.label = label;
        field.required = required;
        field.helpText = helpText;
        field.checked = checked;
      }
    },
    updateFieldValue: (state, action) => {
      const { id, value } = action.payload;
      state.fields = state.fields.map((field) =>
        field.id === id ? { ...field, value } : field
      );
    },

    updateField: (state, action) => {
      const { id, label, placeholder, required, maxLength, autoGrow, rows } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field) {
        field.label = label;
        field.placeholder = placeholder;
        field.required = required;
        // Only update these for textarea fields
        if (field.type === 'textarea') {
          if (maxLength !== undefined) field.maxLength = maxLength;
          if (autoGrow !== undefined) field.autoGrow = autoGrow;
          if (rows !== undefined) field.rows = rows;
        }
      }
    },
    updateOptionGroup: (state, action) => {
      const { id, label, required, helpText, options } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (
        field &&
        (field.type === "optionGroup" || field.type === "dropdown")
      ) {
        field.label = label;
        field.required = required;
        field.helpText = helpText;
        field.options = options;
      }
    },
    // deleteField: (state, action) => {
    //   const id = action.payload;
    //   state.fields = state.fields.filter((field) => field.id !== id);
    //   if (state.activeFieldId === id) {
    //     state.activeFieldId = null;
    //   }
    // },
    deleteField: (state, action) => {
      const idToDelete = action.payload;
      // Remove field from saved forms
      state.savedForms.forEach((form) => {
        form.fields = form.fields.filter((field) => field.id !== idToDelete);
      });
      // Remove field from active fields
      state.fields = state.fields.filter((field) => field.id !== idToDelete);
    },
    addPhoneNumberField: (state) => {
      const newField = {
        id: uuidv4(),
        label: "Phone Number",
        type: "phoneNumber",
        value: "",
        required: true,
      };
      state.fields.push(newField);
    },
    addRadioGroup: (state) => {
      const newRadioGroup = {
        id: uuidv4(),
        label: "Radio Group",
        type: "Radio-group",
        options: [
          { id: uuidv4(), value: "Option 1" },
          { id: uuidv4(), value: "Option 2" },
          { id: uuidv4(), value: "Option 3" },
        ],
        required: false,
        helpText: "",
        value: "", // Store the selected value
      };
      state.fields.push(newRadioGroup);
      state.activeField = newRadioGroup; // Set the newly created group as active
    },
    updateRadioGroup: (state, action) => {
      const { id, label, required, helpText, options } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = {
          ...state.fields[fieldIndex],
          label, // Update the label
          required, // Update the required property
          helpText, // Update the helpText
          options, // Update the options array
        };
        state.activeField = state.fields[fieldIndex]; // Optionally set the activeField to the updated field
      }
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    addMultipleCheckbox: (state) => {
      const newCheckboxGroup = {
        id: uuidv4(),
        label: "Multiple Checkbox",
        type: "MultipleCheckbox",
        options: [
          { id: uuidv4(), value: "Option 1" },
          { id: uuidv4(), value: "Option 2" },
          { id: uuidv4(), value: "Option 3" },
        ],
        required: false,
        helpText: "",
        selectedOptions: [], // Array to hold multiple selections
      };
      state.fields.push(newCheckboxGroup);
      state.activeField = newCheckboxGroup;
    },
    updateMultipleCheckbox: (state, action) => {
      const { id, label, required, helpText, options, selectedOptions } =
        action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = {
          ...state.fields[fieldIndex],
          label,
          required,
          helpText,
          options,
          selectedOptions, // Ensure this is an array of selected options
        };
        state.activeField = state.fields[fieldIndex];
      }
    },
    // deleteField: (state, action) => {
    //   const idToDelete = action.payload;

    //   // Remove the field from the active fields
    //   state.fields = state.fields.filter((field) => field.id !== idToDelete);

    //   // Remove the field from saved forms
    //   state.savedForms.forEach((form) => {
    //     form.fields = form.fields.filter((field) => field.id !== idToDelete);
    //   });

    //   // Reset activeFieldId if the deleted field was active
    //   if (state.activeFieldId === idToDelete) {
    //     state.activeFieldId = null;
    //   }
    // },

    saveFields: (state) => {
      state.savedFields = [...state.fields];
    },
    updateSavedField: (state, action) => {
      const { id, value } = action.payload;
      state.savedForms = state.savedForms.map((form) => {
        form.fields = form.fields.map((field) =>
          field.id === id ? { ...field, value } : field
        );
        return form;
      });
    },
    deleteSavedField: (state, action) => {
      const id = action.payload;
      state.savedFields = state.savedFields.filter((field) => field.id !== id);
    },

    // saveForm: (state, action) => {
    //   const { id, name, info, fields } = action.payload;
    //   const existingForm = state.savedForms.find((form) => form.name === name);

    //   if (existingForm) {
    //     // Update the existing form
    //     existingForm.info = info || existingForm.info;
    //     existingForm.fields = fields || existingForm.fields;
    //   } else {
    //     // Create a new form
    //     const newForm = {
    //       id: id || uuidv4(),
    //       name,
    //       info,
    //       fields: fields || [],
    //     };
    //     state.savedForms.push(newForm);
    //   }
    // },
    saveForm: (state, action) => {
      const { id, name, info, fields, layout, imageUrl } = action.payload;
      
      // Check if form already exists (for updates)
      const existingFormIndex = state.savedForms.findIndex(form => form.id === id);
      
      if (existingFormIndex !== -1) {
        // Update existing form
        state.savedForms[existingFormIndex] = {
          ...state.savedForms[existingFormIndex],
          name,
          info,
          fields,
          layout,
          imageUrl,
        };
      } else {
        // Add new form with the provided ID (or generate one if not provided)
        state.savedForms.push({
          id: id || uuidv4(),
          name,
          info,
          fields,
          layout,
          imageUrl,
        });
      }
    },

    // Load form
    loadForm: (state, action) => {
      const { fields, layout, name, info, id, imageUrl } = action.payload;
      state.fields = fields;
      state.layout = layout;
      state.formName = name;
      state.formInfo = info;
      state.currentFormId = id;
      state.imageUrl = imageUrl;
    },
    updateLayout: (state, action) => {
      state.layout = action.payload;
    },

    // Update an existing form
    updateForm: (state, action) => {
      const { id, fields, name, info } = action.payload;
      const formIndex = state.savedForms.findIndex((form) => form.id === id);

      if (formIndex !== -1) {
        state.savedForms[formIndex] = {
          ...state.savedForms[formIndex],
          fields: fields || state.savedForms[formIndex].fields, // Allow for partial updates
          name: name || state.savedForms[formIndex].name,
          info: info || state.savedForms[formIndex].info,
        };
      }
    },

    deleteForm: (state, action) => {
      const id = action.payload;
      state.savedForms = state.savedForms.filter((form) => form.id !== id);
    },

    // Clear all forms (for syncing with backend)
    clearForms: (state) => {
      state.savedForms = [];
    },

    // Add radio option to a specific group
    addRadioOption: (state, action) => {
      const { groupId, option } = action.payload;
      const field = state.fields.find((field) => field.id === groupId);
      if (field && field.type === "Radio-group") {
        field.options.push({
          id: uuidv4(),
          value: option || "New Option",
        });
      }
    },

    // Remove radio option from a specific group
    removeRadioOption: (state, action) => {
      const { groupId, optionId } = action.payload;
      const field = state.fields.find((field) => field.id === groupId);
      if (field && field.type === "Radio-group") {
        field.options = field.options.filter((option) => option.id !== optionId);
      }
    },

    // Update radio group label
    updateRadioGroupLabel: (state, action) => {
      const { id, label } = action.payload;
      const field = state.fields.find((field) => field.id === id);
      if (field && field.type === "Radio-group") {
        field.label = label;
      }
    },

    duplicateForm: (state, action) => {
      const formId = action.payload;
      const formToDuplicate = state.savedForms.find(
        (form) => form.id === formId
      );
      if (formToDuplicate) {
        const newForm = {
          ...formToDuplicate,
          id: uuidv4(), // Generate a new ID
          name: `${formToDuplicate.name} (Copy)`, // Optionally, modify the name
        };
        state.savedForms.push(newForm);
      }
    },
    addNumberField: (state) => {
      const newField = {
        id: uuidv4(),
        label: "Number Field",
        type: "number",
        value: "",
        min: "",
        max: "",
        required: false,
        shrink: false,
        placeholder: "Enter a number",
      };
      state.fields.push(newField);
    },
  },
});

export const {
  addField,
  removeField,
  updateLayout,
  loadForm,
  updateDateTimeField,
  updateTextEditorLabel,
  addSelectField,
  updateSelectField,
  addMultipleCheckbox,
  updateMultipleCheckbox,
  addRadioGroup,
  updateRadioGroupLabel,
  updateRadioGroup,
  addRadioOption,
  removeRadioOption,

  addOrderTitle,
  addDateField,
  addOptionGroup,
  addDropdownField,
  addFileUploadField,
  updateDropzoneLabel,
  setActiveField,
  updateFieldValue,
  updateField,
  updateOptionGroup,
  deleteField,
  saveFields,
  updateSavedField,
  deleteSavedField,
  saveForm,
  updateForm,
  deleteForm,
  clearForms,
  duplicateForm, // Export the duplicateForm action
  savedForms,
  addSignatureField,
  addCheckbox,
  updateCheckbox,
  addCaptchaField,
  addSpreadsheet,
  updateSpreadsheet,
  addColumn,
  addRow,
  updateColumnName,

  updateCellValue,
  updateSpreadsheetName,
  deleteColumn,
  deleteRow,
  updatedSpreadsheet,
  addTextEditor,
  updateTextEditorValue,
  refreshCaptchaText,
  addSecretTextField,
  addRating,
  updateRating,
  deleteRating,
  addDropzoneField,
  updateDropzoneFileType,
  updateDropzoneMaxFileSize,
  setDropzoneFiles,
  addDatetimeField,
  addSliderField,
  addAddressField,
  updateAddressField,
  updateFieldLabel,
  addPhoneNumberField,
  addDivider,
  updateDivider,
  setDivider,
  addQuestionYesNo,
  updateQuestionYesNo,
  addEmailField,
  addSingleChoiceField,
  updateSingleChoiceOptions,
  updateSingleChoiceValue,
  toggleDarkMode,
  addQuestion,
  setFields,
  addNumberField,
} = formSlice.actions;

export default formSlice.reducer;
