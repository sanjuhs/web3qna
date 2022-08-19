import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn : false,
    address : null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        walletLogin : (state,action) =>{
            state.loggedIn = true;
            state.loading = false;
            state.address = action.payload;
            localStorage.setItem("addr",action.payload);
        },
    }
});

export const {walletLogin} = userSlice.actions;
export default userSlice.reducer;