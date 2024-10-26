import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
    name: 'modal',
    initialState: false,
    reducers:{
        isModalOpen: (state, action) =>{
            return state = action.payload
        }
    }
})
export const {isModalOpen} = ModalSlice.actions;
export default ModalSlice.reducer;