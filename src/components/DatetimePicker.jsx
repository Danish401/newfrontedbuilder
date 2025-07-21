// import React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateFieldValue } from '../features/formSlice'; // Assume this action updates the field value in Redux

// const DatetimePicker = ({ field }) => {
//   const dispatch = useDispatch();

//   const handleDateChange = (newValue) => {
//     dispatch(updateFieldValue({ id: field.id, value: newValue }));
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDateTimePicker
//         orientation="landscape"
//         value={field.value || null}
//         onChange={handleDateChange}
//       />
//     </LocalizationProvider>
//   );
// };

// export default DatetimePicker;



// working fine 
// import React from 'react';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
// import { useDispatch } from 'react-redux';
// import { updateDateTimeField } from '../features/formSlice'; // Adjust the import path as necessary
// import dayjs from 'dayjs';

// const DatetimePicker = ({ field }) => {
//   const dispatch = useDispatch();

//   const handleDateChange = (newValue) => {
//     dispatch(updateDateTimeField({ id: field.id, value: newValue ? newValue.toISOString() : null }));
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDateTimePicker
//         orientation="landscape"
//         value={field.value ? dayjs(field.value) : null} // Ensure field.value is a Day.js object
//         onChange={handleDateChange}
//       />
//     </LocalizationProvider>
//   );
// };

// export default DatetimePicker;



import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { useDispatch } from 'react-redux';
import { updateDateTimeField } from '../features/formSlice'; // Adjust the import path as necessary
import dayjs from 'dayjs';

const DatetimePicker = ({ field }) => {
  const dispatch = useDispatch();

  // Handle the change of date
  const handleDateChange = (newValue) => {
    dispatch(updateDateTimeField({ id: field.id, value: newValue ? newValue.toISOString() : null }));
  };

  // Handle the change of label
  const handleLabelChange = (event) => {
    const newLabel = event.target.value;
    dispatch(updateDateTimeField({ id: field.id, label: newLabel }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: '10px', textAlign: 'center' }}>
        {/* Input field to change the label */}
        <input
          type="text"
          value={field.label || 'Date & Time'}
          onChange={handleLabelChange}
          placeholder="Enter Label"
          style={{
            padding: '5px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        
        {/* Display the DateTimePicker */}
        <StaticDateTimePicker
          orientation="landscape"
          value={field.value ? dayjs(field.value) : null}
          onChange={handleDateChange}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatetimePicker;






