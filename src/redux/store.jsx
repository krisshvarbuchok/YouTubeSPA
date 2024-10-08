import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice/listSlice";
import RequestSlice from "./listSlice/Request";

const store = configureStore({
    reducer: {
        list: listSlice, 
        request: RequestSlice,
    }
})

export default store;