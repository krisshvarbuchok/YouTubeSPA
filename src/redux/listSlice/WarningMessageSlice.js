import { createSlice } from "@reduxjs/toolkit";

const WarningMessageSlice = createSlice({
    name: 'warning',
    initialState: '',
    reducers:{
        getWarning: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {getWarning} = WarningMessageSlice.actions;
export default WarningMessageSlice.reducer;