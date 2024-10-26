import { createSlice } from "@reduxjs/toolkit";

const SelectSlice = createSlice({
    name: 'select',
    initialState: 'searchSortUnspecified',
    reducers:{
        changeSelect: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {changeSelect} = SelectSlice.actions;
export default SelectSlice.reducer;