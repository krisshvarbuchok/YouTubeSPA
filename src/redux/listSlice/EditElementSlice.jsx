import { createSlice } from "@reduxjs/toolkit";

const EditElementSlice = createSlice({
    name:'editElement',
    initialState: {},
    reducers:{
        editElement: (state, action) =>{
            return state = action.payload
        },
        changeRequest: (state, action) => {
            state.request = action.payload;
        },
        changeNameInEdit: (state, action) => {
            state.name = action.payload;
        }
    }
})
export const {editElement, changeRequest, changeNameInEdit} = EditElementSlice.actions;
export default EditElementSlice.reducer;