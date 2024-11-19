import { createSlice } from "@reduxjs/toolkit";

const EditElementSlice = createSlice({
    name:'editElement',
    initialState: {},
    reducers:{
        editElement: (state, action) =>{
            return state = action.payload
        },
        changeNumberInEdit: (state, action) => {
            state.count = action.payload;
        },
        chahgeSelectInEdit: (state, action) =>{
            state.select = action.payload;
        },
    }
})
export const {editElement, changeRequest, changeNameInEdit, changeNumberInEdit, chahgeSelectInEdit} = EditElementSlice.actions;
export default EditElementSlice.reducer;