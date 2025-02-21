import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: localStorage.getItem('email') || '',
    token: '',
    isLoggedIn: !!localStorage.getItem('email'), // Add isLoggedIn flag
    votesData: 0, // Add votesData to the initial state
    votesUsed: null, // Add votesUsed to the initial state
    votesAvailable: null, // Add votesAvailable to the initial state
    role: '', // Add role to the initial state
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            //console.log('2.Store..########loginSuccess action called');
            if (action.meta && action.meta.fileName) {
                //console.log('loginSuccess action called from:', action.meta.fileName);
            }
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.votesData = action.payload.votesData; // Update votesData
            state.votesUsed = action.payload.votesUsed; // Update votesUsed
            state.votesAvailable = action.payload.votesAvailable; // Update votesAvailable
            state.role = action.payload.email === 'sasitharani@gmail.com' ? 'admin' : 'user'; // Set role based on email

            //console.log('votesData from slice:', state.votesData); // Log votesData

            //console.log('Username:', state.username);
            //console.log('Email:', state.email);
            //console.log('Token:', state.token);
            //console.log('Is Logged In:', state.isLoggedIn);
            //console.log('Votes Data:', state.votesData);
            //console.log('Votes Used:', state.votesUsed);
            localStorage.setItem('email', action.payload.email);
            localStorage.setItem('isLoggedIn', 'true'); // Save isLoggedIn to localStorage
        },
        loginSuccess: (state, action) => {
            //console.log('2.Store..########loginSuccess action called');
            if (action.meta && action.meta.fileName) {
                //console.log('loginSuccess action called from:', action.meta.fileName);
            }
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.votesData = action.payload.votesData; // Update votesData
            state.votesUsed = action.payload.votesUsed; // Update votesUsed
            state.votesAvailable = action.payload.votesAvailable; // Update votesAvailable
            state.role = action.payload.email === 'sasitharani@gmail.com' ? 'admin' : 'user'; // Set role based on email
            localStorage.setItem('email', action.payload.email);
        },
        logout: (state, action) => {
            //console.log('logout action called');
            if (action.meta && action.meta.fileName) {
                //console.log('logout action called from:', action.meta.fileName);
            }
            state.username = '';
            state.email = '';
            state.token = '';
            state.isLoggedIn = false;
            state.votesData = []; // Clear votesData on logout
            state.votesUsed = null; // Clear votesUsed on logout
            state.role = ''; // Clear role on logout
            localStorage.removeItem('email');
            localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn from localStorage
        },
    },
});

export const { login, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;