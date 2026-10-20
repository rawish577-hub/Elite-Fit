import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    name: "",
    role: "",
    loading: false,
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        clearUser: (state) => {
            state.user = null
            state.name = ""
            state.role = ""
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setRole: (state, action) => {
            state.role = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
    },
});

export const {
    setUser,
    clearUser,
    setName,
    setRole,
    setLoading
} = homeSlice.actions;

export default homeSlice.reducer;