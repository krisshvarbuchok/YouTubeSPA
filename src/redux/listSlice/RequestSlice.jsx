import { createSlice } from "@reduxjs/toolkit";

const RequestSlice = createSlice({
    name: 'request',
    initialState: '',
    reducers: {
        writeRequest: (state, action)=>{
            return state = action.payload;
        }
    }
})
export const {writeRequest} = RequestSlice.actions;
export default RequestSlice.reducer;