import { createSlice } from "@reduxjs/toolkit";

const changeNameInModalSlice = createSlice({
    name:'changeName',
    initialState: '',
    reducers: {
        changeName: (state, action) =>{
            return state = action.payload
        }
    }
})
export const {changeName} = changeNameInModalSlice.actions;
export default changeNameInModalSlice.reducer;