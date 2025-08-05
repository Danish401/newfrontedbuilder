// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Slider, styled } from '@mui/material';
// import { updateFieldValue } from '../features/formSlice';

// // Define PrettoSlider here
// const PrettoSlider = styled(Slider)({
//   color: '#52af77',
//   height: 8,
//   '& .MuiSlider-track': {
//     border: 'none',
//   },
//   '& .MuiSlider-thumb': {
//     height: 24,
//     width: 24,
//     backgroundColor: '#fff',
//     border: '2px solid currentColor',
//     '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
//       boxShadow: 'inherit',
//     },
//     '&::before': {
//       display: 'none',
//     },
//   },
//   '& .MuiSlider-valueLabel': {
//     lineHeight: 1.2,
//     fontSize: 12,
//     background: 'unset',
//     padding: 0,
//     width: 32,
//     height: 32,
//     borderRadius: '50% 50% 50% 0',
//     backgroundColor: '#52af77',
//     transformOrigin: 'bottom left',
//     transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
//     '&::before': { display: 'none' },
//     '&.MuiSlider-valueLabelOpen': {
//       transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
//     },
//     '& > *': {
//       transform: 'rotate(45deg)',
//     },
//   },
// });

// const CustomizedSlider = ({ field, handleFieldChange, readOnly }) => {
//   const dispatch = useDispatch();

//   // Handle slider value change and dispatch to Redux store
//   const handleSliderChange = (event, newValue) => {
//     if (handleFieldChange) {
//       handleFieldChange(field.id, newValue);
//     } else {
//       dispatch(updateFieldValue({ id: field.id, value: newValue }));
//     }
//   };

//   // Handle label (field name) change
//   const handleLabelChange = (e) => {
//     if (handleFieldChange) {
//       handleFieldChange(field.id, e.target.value, 'label');
//     } else {
//       dispatch(updateFieldValue({ id: field.id, label: e.target.value }));
//     }
//   };

//   return (
//     <div className="mb-2">
//       <label className="block text-sm font-medium text-[#4B49AC] mb-1">{field.label}</label>
//       <PrettoSlider
//         value={field.value}
//         onChange={handleSliderChange}
//         valueLabelDisplay="auto"
//         aria-label="custom thumb label"
//         disabled={readOnly}
//       />
//     </div>
//   );
// };

// export default CustomizedSlider;




import React from 'react';
import { useDispatch } from 'react-redux';
import { Slider, styled } from '@mui/material';
import { updateFieldValue } from '../features/formSlice';

// Define PrettoSlider here
const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&::before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const CustomizedSlider = ({ field, handleFieldChange, readOnly, hideLabel = false }) => {
  const dispatch = useDispatch();

  // Handle slider value change and dispatch to Redux store
  const handleSliderChange = (event, newValue) => {
    if (handleFieldChange) {
      handleFieldChange(field.id, newValue);
    } else {
      dispatch(updateFieldValue({ id: field.id, value: newValue }));
    }
  };

  // Handle label (field name) change
  const handleLabelChange = (e) => {
    if (handleFieldChange) {
      handleFieldChange(field.id, e.target.value, 'label');
    } else {
      dispatch(updateFieldValue({ id: field.id, label: e.target.value }));
    }
  };

  return (
    <div className="mb-2">
      {/* Only show label if hideLabel is false */}
      {!hideLabel && (
        <label className="block text-sm font-medium text-[#4B49AC] mb-1">
          {field.label}
        </label>
      )}
      <PrettoSlider
        value={field.value || 0}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        aria-label="custom thumb label"
        disabled={readOnly}
        min={field.min || 0}
        max={field.max || 100}
        step={field.step || 1}
      />
    </div>
  );
};

export default CustomizedSlider;