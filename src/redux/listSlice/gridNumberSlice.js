import { createSlice } from "@reduxjs/toolkit";

const gridNumberSlice = createSlice({
    name: 'number',
    initialState: 12,
    reducers: {
        changeNumber: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {changeNumber} = gridNumberSlice.actions;
export default gridNumberSlice.reducer;