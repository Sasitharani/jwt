import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: localStorage.getItem('email') || '',
    token: '',
    isLoggedIn: !!localStorage.getItem('email'), // Add isLoggedIn flag
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            console.log('2.Src...########Login action called in slice');
            if (action.meta && action.meta.fileName) {
                console.log('loginSuccess action called from:', action.meta.fileName);
            }
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('isLoggedIn', 'true'); // Save isLoggedIn to localStorage
        },
        loginSuccess: (state, action) => {
            console.log('2.Src..######## loginSuccess action called');
            if (action.meta && action.meta.fileName) {
                console.log('loginSuccess action called from:', action.meta.fileName);
            }
            state.email = action.payload.email;
            state.isLoggedIn = true;
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('isLoggedIn', 'true'); // Save isLoggedIn to localStorage
        },
        logout: (state, action) => {
            console.log('logout action called');
            if (action.meta && action.meta.fileName) {
                console.log('logout action called from:', action.meta.fileName);
            }
            state.username = '';
            state.email = '';
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem('email');
            localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
        },
    },
});

export const { login, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;