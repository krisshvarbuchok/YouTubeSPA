import { createSlice } from "@reduxjs/toolkit"

const RequestTotalSlice = createSlice({
    name: 'requestTotal',
    initialState: '',
    reducers: {
        searchRequest: (state, action) => {
            return state = action.payload;
        }
    }
})
export const {searchRequest} = RequestTotalSlice.actions;
export default RequestTotalSlice.reducer;