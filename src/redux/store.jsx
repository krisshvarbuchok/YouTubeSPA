import { configureStore } from "@reduxjs/toolkit";
import listSlice from "./listSlice/listSlice";
import RequestSlice from "./listSlice/Request";
import isActiveButtonSlice from "./listSlice/isActiveButtonSlice";
import favoriteSlice from "./listSlice/favoriteSlice";
import warningSlice from "./listSlice/warningSlice";
import ModalSlice from "./listSlice/ModalSlice";

const store = configureStore({
    reducer: {
        list: listSlice, 
        request: RequestSlice,
        isActive: isActiveButtonSlice,
        favorite: favoriteSlice,
        warning: warningSlice,
        modal: ModalSlice,
    }
})

export default store;