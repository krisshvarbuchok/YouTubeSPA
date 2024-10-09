import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice/listSlice";
import RequestSlice from "./listSlice/Request";
import isActiveButtonSlice from "./listSlice/isActiveButtonSlice";

const store = configureStore({
    reducer: {
        list: listSlice, 
        request: RequestSlice,
        isActive: isActiveButtonSlice,
    }
})

export default store;