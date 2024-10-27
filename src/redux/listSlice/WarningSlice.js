import { createSlice } from "@reduxjs/toolkit";

const WarningComponentSlice = createSlice({
    name: 'warning',
    initialState: '',
    reducers:{
        getWarning: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {getWarning} = WarningComponentSlice.actions;
export default WarningComponentSlice.reducer;