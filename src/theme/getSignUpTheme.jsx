const getSignUpTheme = (mode) => ({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#6E6ADE' : '#7D66D9',
      },
      secondary: {
        main: '#B1A9FF',
      },
      background: {
        default: mode === 'light' ? '#FFFFFF' : '#333333',
        paper: mode === 'light' ? '#E2DDFE' : '#7D66D9',
      },
    },
  });
  
  export default getSignUpTheme;
  