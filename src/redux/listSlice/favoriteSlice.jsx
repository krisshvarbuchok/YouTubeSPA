import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: [],
    reducers: {
        initialFavorite: (state, action) => {
            return state = action.payload;
        },
        addFavorite: (state, action) => {
            state.push(action.payload)
        },
        deleteFavorite: (state, action) => {
            return state = state.filter(item => item.id !== action.payload)
        },
        editFavorite: (state, action) => {
            return state.map(item => item.id === action.payload.id ?
                {
                    ...item,
                    request: action.payload.request,
                    name: action.payload.name,
                    count: action.payload.count,
                    select: action.payload.select
                } :
                item);

        }
    }
})
export const { initialFavorite, addFavorite, deleteFavorite, editFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;