import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    value: 0,
    user:null,
    selectedImage:null
  },
  // The `reducers` efine reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
state.user = null; 
    },
    selectImage: (state, action) => {
      state.selectedImage= action.payload
    },
    resetImage: (state) =>{
      state.selectedImage = null
    }
  },
});


export const { login , logout, selectImage, resetImage} = appSlice.actions;


export const selectUser = (state) => state.app.user;
export const selectSelectedImage = (state)=> state.app.selectedImage; 

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default appSlice.reducer;
