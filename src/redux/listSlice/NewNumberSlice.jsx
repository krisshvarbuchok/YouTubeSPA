import { createSlice } from "@reduxjs/toolkit";

const NewNumberSlice = createSlice({
    name: 'newNumber',
    initialState: 12,
    reducers: {
        setNewNumber: (state, action) =>{
            return state = action.payload;
        }
    }
})
export const {setNewNumber} = NewNumberSlice.actions;
export default NewNumberSlice.reducer;