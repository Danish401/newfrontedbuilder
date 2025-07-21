import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { isValidPhoneNumber } from 'react-phone-number-input'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Simple encryption utility (for demo purposes - use a proper encryption library in production)
export const encryptData = (data, key = 'form-builder-key') => {
  if (!data) return data;
  
  try {
    // Simple XOR encryption (not secure for production)
    const encrypted = btoa(data).split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(0))
    ).join('');
    return `ENCRYPTED:${btoa(encrypted)}`;
  } catch (error) {
    console.error('Encryption error:', error);
    return data;
  }
};

export const decryptData = (encryptedData, key = 'form-builder-key') => {
  if (!encryptedData || !encryptedData.startsWith('ENCRYPTED:')) return encryptedData;
  
  try {
    const encrypted = encryptedData.replace('ENCRYPTED:', '');
    const decoded = atob(encrypted);
    const decrypted = decoded.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(0))
    ).join('');
    return atob(decrypted);
  } catch (error) {
    console.error('Decryption error:', error);
    return encryptedData;
  }
};

// Process form data for encryption
export const processFormData = (fields) => {
  return fields.map(field => {
    if (field.encrypt && field.value) {
      return {
        ...field,
        value: encryptData(field.value),
        originalValue: field.value // Keep original for display
      };
    }
    return field;
  });
};

// Comprehensive validation function for all field types
export const validateField = (field) => {
  let isValid = true;
  let error = null;

  // Captcha validation
  if (field.type === 'captcha') {
    if (field.required && (!field.value || field.value.trim() === '')) {
      isValid = false;
      error = 'This field is required';
      return { isValid, error };
    }
    if (field.value && field.value.trim() !== (field.captchaText || '').trim()) {
      isValid = false;
      error = 'Please enter the correct captcha';
      return { isValid, error };
    }
  }

  // Check max length first (applies to all text-based fields)
  if (field.maxLength && field.value) {
    const length = field.value.toString().length;
    if (length > field.maxLength) {
      isValid = false;
      error = `Maximum ${field.maxLength} characters allowed (current: ${length})`;
      return { isValid, error };
    }
  }

  // Check required validation
  if (field.required) {
    if (field.type === 'checkbox') {
      isValid = field.checked;
      error = isValid ? null : 'This field is required';
    } else if (field.type === 'dropzone') {
      isValid = field.files && field.files.length > 0;
      error = isValid ? null : 'Please upload at least one file';
    } else if (field.type === 'signature') {
      isValid = !!field.value;
      error = isValid ? null : 'Please provide a signature';
    } else if (field.type === 'spreadsheet') {
      isValid = field.rows && field.rows.length > 0;
      error = isValid ? null : 'Please add at least one row to the spreadsheet';
    } else if (field.type === 'address') {
      // For address fields, check if at least one field is filled
      const hasAddressData = field.addressLine1 || field.addressLine2 || field.city || 
                            field.state || field.postCode || field.country;
      isValid = !!hasAddressData;
      error = isValid ? null : 'Please provide at least one address detail';
    } else if (field.type === 'email') {
      const value = field.value || '';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValid = value.trim() !== '' && emailRegex.test(value);
      error = isValid ? null : 'Please enter a valid email address';
    } else if (field.type === 'phoneNumber') {
      const value = field.value || '';
      isValid = value.trim() !== '' && isValidPhoneNumber(value);
      error = isValid ? null : 'Please enter a valid phone number';
    } else {
      // Text-based fields
      const value = field.value || '';
      isValid = value.toString().trim() !== '';
      error = isValid ? null : 'This field is required';
    }
  }

  // Additional validation for specific field types
  if (isValid && field.value) {
    if (field.type === 'email' && !field.required) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (field.value.trim() !== '' && !emailRegex.test(field.value)) {
        isValid = false;
        error = 'Please enter a valid email address';
      }
    }
    
    if (field.type === 'phoneNumber' && !field.required) {
      if (field.value.trim() !== '' && !isValidPhoneNumber(field.value)) {
        isValid = false;
        error = 'Please enter a valid phone number';
      }
    }
  }

  return { isValid, error };
};

// Validate entire form
export const validateForm = (fields) => {
  const errors = [];
  let isValid = true;

  fields.forEach(field => {
    const validation = validateField(field);
    if (!validation.isValid) {
      errors.push({
        fieldId: field.id,
        fieldLabel: field.label || 'Unnamed field',
        error: validation.error
      });
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Get field validation state for real-time feedback
export const getFieldValidationState = (field) => {
  if (!field.value && !field.required) {
    return { isValid: true, error: null, isDirty: false };
  }

  const validation = validateField(field);
  return {
    ...validation,
    isDirty: true
  };
};
