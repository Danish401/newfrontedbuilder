import React from 'react';
import { Select, Option } from '@mui/joy';
import { useDispatch } from 'react-redux';
import { updateSelectField } from "../features/formSlice"; // Import your action from the slice

const CustomSelect = ({ field }) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(updateSelectField({ id: field.id, value })); // Dispatch action to update the field value
  };

  return (
    <Select
      color={field.color}
      disabled={field.isDisabled}
      placeholder={field.placeholder}
      size={field.size}
      variant={field.variant}
      value={field.value} // Assuming field.value holds the current value
      onChange={(e) => handleChange(e.target.value)}
    >
      {field.options.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
