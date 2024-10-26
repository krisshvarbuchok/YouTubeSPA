import { createSlice } from "@reduxjs/toolkit";

const WarningSlice = createSlice({
    name: 'warning',
    initialState: '',
    reducers:{
        getWarning: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {getWarning} = WarningSlice.actions;
export default WarningSlice.reducer;