// slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // To store user details like name and email
  token: null, // To store JWT or other tokens
  isAuthenticated: false, // Authentication status
  loading: false, // Loading state for async actions
  error: null, // To store error messages
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to handle login
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Action to handle logout
    logout1(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout1 } = authSlice.actions;

export default authSlice.reducer;










// isAuthenticated && user ? (
//     <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//       <Typography variant="body1">
//         {user.name} ({user.email})
//       </Typography>
//       <Button color="inherit" onClick={handleLogout}>
//         Logout
//       </Button>
//     </div>