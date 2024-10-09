import { createSlice } from "@reduxjs/toolkit";


const isActiveButtonSlice = createSlice({
    name: 'isActive',
    initialState: 'search',
    reducers: {
        isActiveButton: (state, action)=>{
            return state = action.payload;
        }
    }
})
export const {isActiveButton} = isActiveButtonSlice.actions;
export default isActiveButtonSlice.reducer;
