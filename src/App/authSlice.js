import { createSlice } from "@reduxjs/toolkit";

// initialState
const initialState  = {
    status: false,
    userData: null,
    loading: true, 
    loaded:false,
}

// slice
const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login: (state, actions) => {
            state.status = true;
            state.userData = actions.payload.userData
            state.loading = false;
        },
        logout: (state) => {
            state.status = false; 
            state.userData = null;
            state.loading = false;
        },
        startLoading: (state) => {
            state.loading = true; // Set loading to true when an asynchronous operation starts
        },
        stopLoading: (state) => {
            state.loading = false; // Set loading to false when an asynchronous operation stops
            state.loaded = true
        },
        authLoaded: (state) =>{
            state.loaded = true
        },
        authLoading: (state) =>{
            state.loaded = false
        }
    }
})


export const { login, logout ,startLoading,stopLoading,authLoaded,authLoading} = authSlice.actions
export default authSlice.reducer