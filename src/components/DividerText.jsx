import * as React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  '& > :not(style) ~ :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleDivider({ field }) {
  const dividerStyle = {
    border: 'none',
    height: field?.height || '1px',
    width: field?.width || '100%',
    backgroundColor: field?.color || '#000000',
    borderTop: `${field?.thickness || 1}px ${field?.style || 'solid'} ${field?.color || '#000000'}`,
    margin: field?.margin || '10px 0',
  };

  return (
    <Root>
      <div style={dividerStyle} />
    </Root>
  );
}
