import React, { useEffect, useState } from 'react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const PhoneNumberField = ({ field, handleFieldChange }) => {
  const value = field.value || '';
  const [phone, setPhone] = useState(value);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setPhone(value);
  }, [value]);

  useEffect(() => {
    handleFieldChange(field.id, phone);
  }, [phone]);

  const validate = (val) => {
    if (field.required && (!val || val.trim() === '')) {
      return 'Phone number is required';
    }
    if (val && !isValidPhoneNumber(val)) {
      return 'Invalid phone number for selected country';
    }
    return '';
  };

  const handleChange = (val) => {
    setPhone(val);
    if (touched) {
      setError(validate(val));
    }
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validate(phone));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <PhoneInput
        international
        defaultCountry="IN"
        value={phone}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full"
        placeholder="Mobile number"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default PhoneNumberField;
