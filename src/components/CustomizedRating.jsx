import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { updateRating } from '../features/formSlice';

const iconOptions = {
  star: '⭐',
  heart: '❤️',
  bulb: '💡',
  bolt: '⚡',
  flag: '🚩',
  shield: '🛡️',
  plus: '➕',
};

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#4b49ac',
  },
  '& .MuiRating-iconHover': {
    color: '#cbcdff',
  },
});

const LabelInput = styled('input')({
  padding: '5px',
  borderRadius: '4px',
  border: '1px solid #4b49ac',
  outline: 'none',
  marginBottom: '10px',
  fontSize: '16px',
});

export default function CustomizedRating({ field, onChange }) {
  const dispatch = useDispatch();

  const handleRatingChange = (newValue) => {
    dispatch(updateRating({ id: field.id, value: newValue }));
  };

  const handleLabelChange = (event) => {
    const newLabel = event.target.value;
    dispatch(updateRating({ id: field.id, label: newLabel }));
  };

  const icon = iconOptions[field.ratingIcon] || '⭐';
  const max = field.ratingAmount || 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box textAlign="center" p={2} boxShadow={3} borderRadius={4} bgcolor="#f7f8fc">
        {/* Input to change the label */}
        {typeof onChange !== 'function' && (
          <LabelInput 
            type="text"
            value={field.label || ''} 
            onChange={handleLabelChange}
            placeholder="Enter Label"
          />
        )}
        
        <Typography component="h6" variant="h6" mb={2} color="#4b49ac">
          {field.label}: {field.value || 0}
        </Typography>

        <StyledRating
          value={field.value || 0}
          max={max}
          onChange={(event, newValue) => {
            if (onChange) onChange(newValue);
            else handleRatingChange(newValue);
          }}
          icon={<span style={{ fontSize: 32 }}>{icon}</span>}
          emptyIcon={<span style={{ fontSize: 32, opacity: 0.3 }}>{icon}</span>}
        />
      </Box>
    </motion.div>
  );
}
