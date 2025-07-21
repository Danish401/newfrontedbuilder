import * as React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { useDispatch } from 'react-redux';
import { updateRating } from '../features/formSlice';

const iconOptions = [
  { key: 'star', icon: '⭐' },
  { key: 'heart', icon: '❤️' },
  { key: 'bulb', icon: '💡' },
  { key: 'bolt', icon: '⚡' },
  { key: 'flag', icon: '🚩' },
  { key: 'shield', icon: '🛡️' },
  { key: 'plus', icon: '➕' },
];

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const RatingEditor = ({ field, onClose }) => {
  const dispatch = useDispatch();
  const [ratingValue, setRatingValue] = React.useState(field.value || 0);
  const [ratingIcon, setRatingIcon] = React.useState(field.ratingIcon || 'star');
  const [ratingAmount, setRatingAmount] = React.useState(field.ratingAmount || 5);

  const handleSave = () => {
    dispatch(updateRating({ id: field.id, value: ratingValue, ratingIcon, ratingAmount }));
    onClose();
  };

  return (
    <div style={{ padding: 16 }}>
      <h3 style={{ marginBottom: 12 }}>Rating Icon</h3>
      <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
        {iconOptions.map(opt => (
          <button
            key={opt.key}
            style={{
              fontSize: 28,
              background: ratingIcon === opt.key ? '#1976d2' : '#222',
              color: ratingIcon === opt.key ? '#fff' : '#eee',
              border: ratingIcon === opt.key ? '2px solid #1976d2' : '1px solid #444',
              borderRadius: 8,
              padding: 6,
              outline: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onClick={() => setRatingIcon(opt.key)}
            aria-label={opt.key}
          >
            {opt.icon}
          </button>
        ))}
      </div>
      <div style={{ color: '#aaa', fontSize: 13, marginBottom: 18 }}>Select an icon for your rating scale</div>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', color: '#fff', marginBottom: 4 }}>Rating Amount</label>
        <input
          type="number"
          min={1}
          max={20}
          value={ratingAmount}
          onChange={e => setRatingAmount(Number(e.target.value))}
          style={{
            width: 60,
            padding: 6,
            borderRadius: 4,
            border: '1px solid #444',
            background: '#222',
            color: '#fff',
            fontSize: 16,
          }}
        />
        <div style={{ color: '#aaa', fontSize: 13, marginTop: 2 }}>Enter a maximum value for your rating scale</div>
      </div>
      <div style={{ display: 'flex', gap: 12, margin: '16px 0' }}>
        <StyledRating
          value={ratingValue}
          max={ratingAmount}
          onChange={(event, newValue) => setRatingValue(newValue)}
          icon={<span style={{ fontSize: 32 }}>{iconOptions.find(opt => opt.key === ratingIcon)?.icon || '⭐'}</span>}
          emptyIcon={<span style={{ fontSize: 32, opacity: 0.3 }}>{iconOptions.find(opt => opt.key === ratingIcon)?.icon || '⭐'}</span>}
        />
        <span style={{ color: '#fff', alignSelf: 'center' }}>{ratingValue} / {ratingAmount}</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}
          onClick={handleSave}
        >Save</button>
        <button
          style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}
          onClick={onClose}
        >Cancel</button>
      </div>
    </div>
  );
};

export default RatingEditor;
