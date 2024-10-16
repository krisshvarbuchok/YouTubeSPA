import { createSlice } from "@reduxjs/toolkit";

const DisplaySlice = createSlice({
    name: 'display',
    initialState: 'grid',
    reducers:{
        changeDisplay: (state, action) => {
            return state = action.payload;
        }
    }
})
export const {changeDisplay} = DisplaySlice.actions;
export default DisplaySlice.reducer;