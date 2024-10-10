import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name:'favorite',
    initialState: [],
    reducers: {
        addFavorite: (state, action) =>{
            state.push(action.payload)
        }
    }
})
export const {addFavorite} = favoriteSlice.actions;
export default favoriteSlice.reducer;